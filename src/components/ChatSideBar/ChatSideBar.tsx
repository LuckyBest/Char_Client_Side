import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Params, useParams } from "react-router-dom";
import { getAllChats, setUserLogin } from "../../store/Actions/Settings";
import { getAllChatsData, getUserData } from "../../store/Selectors/selectors";
import { ChatsListT } from "../../utils/Types";
import {
  ChatComponent,
  ChatComponentT,
} from "../Chat/ChatComponent/ChatComponent";

import s from "./ChatSideBar.module.scss";

export const ChatSideBar: FC = ({ ...props }): JSX.Element => {
  const dispatch = useDispatch();
  const chatsData: Array<ChatsListT> = useSelector(getAllChatsData);
  const userLogin: string = useSelector(getUserData).userLogin;
  const { userId }: Readonly<Params<string>> = useParams();
  const setChatsData = ():void => {
    dispatch(getAllChats());
  };

  React.useEffect(() => {
    setChatsData();
    if (!userLogin && !!userId) dispatch(setUserLogin(userId));
  }, []);

  return (
    <div className={s.container}>
      <div className={s.container_purple} />
      <div className={s.container_chats}>
        {chatsData.map((item: ChatsListT, index: number): JSX.Element => {
          if (item.login !== userLogin) {
            const ChatComponentProps: ChatComponentT = {
              senderId: userLogin,
              receiverId: item.login,
            };
            return (
              <React.Fragment key={`${index}_${item.login}`}>
                <ChatComponent {...ChatComponentProps} />
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={`${index}_${item.login}`}></React.Fragment>
            );
          }
        })}
      </div>
    </div>
  );
};
