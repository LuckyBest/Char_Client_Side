import React, { FC } from "react";
import { Header } from "./Header/Header";
import { ChatMessages } from "./ChatMessages/ChatMessages";
import { ChatInput } from "./ChatInput/ChatInput";
import { ArrowBack } from "../../assets/ArrowBack";

import s from "./Chat.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getInterfaceInfo } from "../../store/Selectors/selectors";
import { getAllChats, setMobileChatsListVisibility } from "../../store/Actions/Settings";


export const Chat: FC = ({ ...props }): JSX.Element => {

  const dispatch = useDispatch();
  const messageContainerRef:any = React.useRef(null);
  const isChatsListShown:boolean = useSelector(getInterfaceInfo).isChatsListShown;

  const startFromBottom = ():void => {
    // if(!!messageContainerRef.current){
    //   messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight - messageContainerRef.current.clientHeight;
    //   console.log('messageContainerRef.current.scrollTop', messageContainerRef.current.scrollTop);
    // }
    messageContainerRef.current.scrollIntoView();
  };

  const arrowBackClickHandler = ():void => {
    dispatch(getAllChats());
    dispatch(setMobileChatsListVisibility(true));
  }

  React.useEffect(() => {
    startFromBottom();
  });

  let containerClass:string = `${s.container}`;

  if(!isChatsListShown){
    containerClass += ` ${s.enabled}`;
  }

  return (
    <div className={containerClass}>
      <div className={s.container_header}>
        <Header />
      </div>
      <div className={s.container_main}>
        <ChatMessages messageContainerRef = {messageContainerRef}/>
      </div>
      <div className={s.container_send}>
        <div className={s.container_send_arrow} onClick={arrowBackClickHandler}>
          <ArrowBack/>
        </div>
        <ChatInput />
      </div>
    </div>
  );
};
