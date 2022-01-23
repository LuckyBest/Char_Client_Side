import React, { FC } from "react";
import { useSelector } from "react-redux";
import {
  getConversationData,
  getUserData,
} from "../../../store/Selectors/selectors";
import { ConversationT } from "../../../utils/Types";
import { MessageT } from "../../../utils/Types";
import { MessageComponent } from "../../MessageComponent/MessageComponent";
import { io } from "socket.io-client";

import s from "./ChatMessages.module.scss";

export const ChatMessages: FC = ({ ...props }): JSX.Element => {
  const activeConversation: ConversationT =
    useSelector(getConversationData).ActiveConversation;
  const { userLogin }: { userLogin: string } = useSelector(getUserData);
  const [socket, setSocket] = React.useState<any>(null);

  React.useEffect(() => {
    setSocket(io("ws://localhost:8900"));
  }, []);

  React.useEffect(() => {
    if (!!socket)
      socket.onmessage = (data: any) => {
        console.log("data", data);
      };
  }, [socket]);

  return (
    <div className={s.container}>
      <div className={s.container_messages_body}>
        {!!activeConversation &&
          activeConversation.messages.map(
            (message: MessageT, index: number): JSX.Element => {
              return (
                <React.Fragment key={`${index}`}>
                  <MessageComponent userLogin={userLogin} text={message.text} />
                </React.Fragment>
              );
            }
          )}
      </div>
    </div>
  );
};
