import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Params, useParams } from "react-router-dom";
import { getConversationData } from "../../../store/Selectors/selectors";
import { debounce } from "../../../utils/debounce";
import { ConversationT } from "../../../utils/Types";
import { io } from "socket.io-client";
import s from "./ChatInput.module.scss";

export const ChatInput: FC = ({ ...props }): JSX.Element => {
  const [text, setText] = React.useState<string>("");
  const activeConversationData: ConversationT =
  useSelector(getConversationData).ActiveConversation;
  const socketRef:any = React.useRef(io("ws://localhost:8900")); 
  const textareaRef = React.useRef<any>();
  const { userId }: Readonly<Params<string>> = useParams();

  const textOnChangeHandler = (e: any): void => {
    setText(e.target.value);
  };

  const sendOnClickHandler = (): void => {
    const isEmpty: boolean = !text.split(" ").join();

    if (
      !!userId &&
      !isEmpty &&
      !!activeConversationData._id &&
      !!socketRef.current &&
      !!textareaRef.current
    ) {

      socketRef.current.emit("sendMessage",{
        sender: userId,
        conversationId: activeConversationData._id,
        text,
      });

      textareaRef.current.value = "";
      setText("");
    }
  };

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
