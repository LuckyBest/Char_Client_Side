import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Anonym } from "../../../assets/Anonym";
import {
  asyncChooseConversation,
  asyncConversationCreation,
  chooseConversation,
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

  const setUsersConversations =
    (senderId: string, receiverId: string) => (): void => {
      if (!doesConversationExist) {
        dispatch(asyncConversationCreation(senderId, receiverId));
      } else {
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
