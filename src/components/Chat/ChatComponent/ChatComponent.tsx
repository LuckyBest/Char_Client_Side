import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Anonym } from "../../../assets/Anonym";
import {
  asyncChooseConversation,
  asyncConversationCreation,
} from "../../../store/Actions/Settings";
import { isConversation } from "../../../store/Selectors/selectors";
import { ConversationT } from "../../../utils/Types";
import s from "./ChatComponent.module.scss";

export type ChatComponentT = {
  senderId: string;
  receiverId: string;
};

export const ChatComponent: FC<ChatComponentT> = ({
  ...props
}): JSX.Element => {
  const { senderId, receiverId } = props;
  const dispatch = useDispatch();
  const doesConversationExist: ConversationT = useSelector(
    isConversation(senderId, receiverId)
  );
  const socketRef:any = React.useRef(io("ws://localhost:8900"));

  const setUsersConversations =
    (senderId: string, receiverId: string) => (): void => {
      if (!doesConversationExist) {
        if(!!socketRef.current)
          dispatch(asyncConversationCreation(senderId, receiverId, socketRef.current.id));
      } 
      else {
        dispatch(asyncChooseConversation(doesConversationExist._id));
      }
    };

  return (
    <div
      className={s.container}
      onClick={setUsersConversations(senderId, receiverId)}
    >
      <Anonym />
      <div className={s.container_info}>
        <span>{receiverId}</span>
        {/* <p>Anonym</p> */}
      </div>
    </div>
  );
};
