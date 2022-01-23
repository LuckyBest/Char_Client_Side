import React, { FC } from "react";
import { Header } from "./Header/Header";

import s from "./Chat.module.scss";
import { ChatMessages } from "./ChatMessages/ChatMessages";
import { ChatInput } from "./ChatInput/ChatInput";

export const Chat: FC = ({ ...props }): JSX.Element => {
  return (
    <div className={s.container}>
      <div className={s.container_header}>
        <Header />
      </div>
      <div className={s.container_main}>
        <ChatMessages />
      </div>
      <div className={s.container_send}>
        <ChatInput />
      </div>
    </div>
  );
};
