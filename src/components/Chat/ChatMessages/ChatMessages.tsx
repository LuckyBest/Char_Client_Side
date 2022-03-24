import React, { FC, Suspense } from "react";
import { useSelector } from "react-redux";
import {
  getConversationData, getUserData,
} from "../../../store/Selectors/selectors";
import { ConversationT } from "../../../utils/Types";
import { MessageT } from "../../../utils/Types";
import { useFetchMessages } from "../../../utils/FetchMessages";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../../utils/socketsSettings";

import s from "./ChatMessages.module.scss";

const MessageComponent = React.lazy(() => import("../../MessageComponent/MessageComponent"));

export type userDataT = {
  userId: string,
  socketId: string
}

export type ChatMessagesT = {
  messageContainerRef: any;
}

export const ChatMessages: FC<ChatMessagesT> = ({ ...props }): JSX.Element => {
  const { messageContainerRef } = props;
  const activeConversation: ConversationT =
    useSelector(getConversationData).ActiveConversation;
  const { userLogin }: { userLogin :string }= useSelector(getUserData);
  const socketRef:any = React.useRef(io(SOCKET_URL, { transports: ["websocket" ]}));
  const chatBottomRef = React.useRef<null | HTMLDivElement>(null);
  // const messageContainerRef:any = React.useRef(null);
  const [messages, setMessages]: any = useFetchMessages(
    { 
      conversationId: activeConversation._id, 
      messagesCount: 30,
      messageContainerRef: messageContainerRef.current 
    });

  const startFromBottom = (): void => {
    if(!!messageContainerRef.current){
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight - messageContainerRef.current.clientHeight;
      // console.log('messageContainerRef.current.scrollTop', messageContainerRef.current.scrollTop);
    }
  };



  const scrollToBottom = (): void => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  // console.log('messages', messages);

  
  React.useEffect(() => {
    if (!!socketRef.current.id){
      const userData: userDataT = {
        userId: userLogin,
        socketId: socketRef.current.id
      };

      console.log('userData', userData);
      socketRef.current.emit('addUser', userData);
    }
  })

  React.useEffect(() => { 
    if (!!socketRef.current){
      socketRef.current.open();
      socketRef.current.on("getMessage", async (data: any) => {
        // console.log('data', data);
        
        setMessages((prevData: Array<MessageT>): Array<MessageT> => [...prevData, data]);
        scrollToBottom();
      });
    }
    return () => {
      if (!!socketRef.current)
        socketRef.current.close();
    };
  }, [socketRef.current]);

  return (
    <div className={s.container} ref = {messageContainerRef}>
      <div className={s.container_messages_body} >
        <Suspense fallback={<div>Loading...</div>}>
          {!!messages &&
            messages.map(
              (message: MessageT, index: number): JSX.Element => {
                return (
                  <React.Fragment key={`${index}`}>
                    <MessageComponent userLogin={message.sender} text={message.text} />
                  </React.Fragment>
                );
              }
            )}
        </Suspense>
        <div className={s.bottom} ref={chatBottomRef}/>
      </div>
    </div>
  );
};