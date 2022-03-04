import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversationData,
  getUserData,
} from "../../../store/Selectors/selectors";
import { ConversationT } from "../../../utils/Types";
import { MessageT } from "../../../utils/Types";
import { MessageComponent } from "../../MessageComponent/MessageComponent";
import { io } from "socket.io-client";
import { sendMessage } from "../../../store/Actions/Settings";

import s from "./ChatMessages.module.scss";

export const ChatMessages: FC = ({ ...props }): JSX.Element => {
  const dispatch = useDispatch();
  const activeConversation: ConversationT =
    useSelector(getConversationData).ActiveConversation;
  const socketRef:any = React.useRef(io("ws://localhost:8900"));
  
  React.useEffect(() => {        
    if (!!socketRef.current){
      socketRef.current.open();
      socketRef.current.on("getMessage", async (data: any) => {
        dispatch(
          sendMessage(data)
        );
      })
    }
    return () => {
      if (!!socketRef.current)
        socketRef.current.close();
    };
  }, [socketRef.current]);

  return (
    <div className={s.container}>
      <div className={s.container_messages_body}>
        {!!activeConversation && !!activeConversation.messages &&
          activeConversation.messages.map(
            (message: MessageT, index: number): JSX.Element => {
              return (
                <React.Fragment key={`${index}`}>
                  <MessageComponent userLogin={message.sender} text={message.text} />
                </React.Fragment>
              );
            }
          )}
      </div>
    </div>
  );
};
