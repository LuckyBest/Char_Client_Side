import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Params, useParams } from "react-router-dom";
import { getConversationData } from "../../../store/Selectors/selectors";
import { debounce } from "../../../utils/debounce";
import { ConversationT } from "../../../utils/Types";
import { io } from "socket.io-client";
import s from "./ChatInput.module.scss";
import { SOCKET_URL } from "../../../utils/socketsSettings";

export const ChatInput: FC = ({ ...props }): JSX.Element => {
  const [text, setText] = React.useState<string>("");
  const activeConversationData: ConversationT =
  useSelector(getConversationData).ActiveConversation;
  const socketRef:any = React.useRef(io(SOCKET_URL, { transports: ["websocket" ]})); 
  const textareaRef = React.useRef<any>();
  const { userId }: Readonly<Params<string>> = useParams();

  const textOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const sendOnClickHandler = (): void => {
    const isEmpty: boolean = !text.split(" ").join();
    const sendMessageCondition:boolean = !!userId && !isEmpty && 
                                  !!activeConversationData._id &&
                                  !!socketRef.current &&
                                  !!textareaRef.current
    
    if (sendMessageCondition) {
      socketRef.current.emit("sendMessage",{
        sender: userId,
        conversationId: activeConversationData._id,
        text,
      });

      textareaRef.current.value = "";
      setText("");
    }
  };

  // const onPressSendMessageHandler = (event:any):void => {
  //   const isEmpty: boolean = !text.split(" ").join();
  //   const sendMessageCondition:boolean = !!userId && !isEmpty && 
  //                                 !!activeConversationData._id &&
  //                                 !!socketRef.current &&
  //                                 !!textareaRef.current
    
  //   const isEnterPressed:boolean = event.key === "Enter"; 

  //   if (isEnterPressed && sendMessageCondition) {
  //     socketRef.current.emit("sendMessage",{
  //       sender: userId,
  //       conversationId: activeConversationData._id,
  //       text,
  //     });

  //     textareaRef.current.value = "";
  //     setText("");
  //   }
  // }

  if(!activeConversationData._id)
    return <div className={s.container}></div>;


  return (
    <div className={s.container}>
      <textarea
        onChange={debounce(textOnChangeHandler)}
        defaultValue={text}
        ref={textareaRef}
      />
      <span onClick={sendOnClickHandler}>Send</span>
    </div>
  );
};
