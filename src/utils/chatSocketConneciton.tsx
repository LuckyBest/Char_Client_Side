import React from 'react';
import { io } from 'socket.io-client';
import { MessageT } from './Types';

const socketConnection:any = io("ws://localhost:8900")

export const useSocketConnection = () => {
    const socketRef:any = React.useRef(socketConnection);
    const [messagesData, setMessagesData] = React.useState<Array<MessageT>>([]);

    console.log('socketConnection', socketConnection);

    React.useEffect(() => {        
      if (!!socketRef.current){
        socketRef.current.open();
        socketRef.current.on("getMessage", async (data: Array<MessageT>) => {
            await setMessagesData(data);
        })
      }
      return () => {
        if (!!socketRef.current)
          socketRef.current.close();
      };
    }, [socketRef.current]);


    return messagesData;
}