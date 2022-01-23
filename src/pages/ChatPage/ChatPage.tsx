import React from "react";
import { useDispatch } from "react-redux";
import { Params, useParams } from "react-router-dom";
import { Chat } from "../../components/Chat/Chat";
import { ChatSideBar } from "../../components/ChatSideBar/ChatSideBar";
import { asyncGetUserConversation } from "../../store/Actions/Settings";
import s from "./ChatPage.module.scss";

export const ChatPage = ({ ...props }): JSX.Element => {
  const dispatch = useDispatch();
  const { userId }: Readonly<Params<string>> = useParams();

  const onLoadDataSet = (userId: string): void => {
    dispatch(asyncGetUserConversation(userId));
  };

  React.useEffect(() => {
    if (!!userId) onLoadDataSet(userId);
  }, []);

  return (
    <div className={s.container}>
      <div className={s.container_content}>
        <ChatSideBar />
        <Chat />
      </div>
    </div>
  );
};
