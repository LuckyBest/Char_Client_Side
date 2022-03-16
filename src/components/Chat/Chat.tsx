import React, { FC } from "react";
import { Header } from "./Header/Header";
import { ChatMessages } from "./ChatMessages/ChatMessages";
import { ChatInput } from "./ChatInput/ChatInput";

import s from "./Chat.module.scss";


export const Chat: FC = ({ ...props }): JSX.Element => {

  const messageContainerRef:any = React.useRef(null);

  const startFromBottom = ():void => {
    if(!!messageContainerRef.current){
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight - messageContainerRef.current.clientHeight;
      // console.log('messageContainerRef.current.scrollTop', messageContainerRef.current.scrollTop);
    }
  };

  React.useEffect(() => {
    startFromBottom();
  }, [messageContainerRef.current]);

  return (
    <div className={s.container}>
      <div className={s.container_header}>
        <Header />
      </div>
      <div className={s.container_main}>
        <ChatMessages messageContainerRef = {messageContainerRef}/>
      </div>
      <div className={s.container_send}>
        <ChatInput />
      </div>
    </div>
  );
};
