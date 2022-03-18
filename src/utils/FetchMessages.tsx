import axios from 'axios';
import React from 'react'
import { API_URL } from '../http';
import { MessageT } from './Types';

export type useFetchMessagesT = {
    conversationId:string;
    messagesCount:number;
    messageContainerRef: HTMLDivElement;
}
    
export const useFetchMessages = ({...props}:useFetchMessagesT) => {

    const { conversationId, messagesCount, messageContainerRef } = props; 
    const [isFetching, setIsFetching] = React.useState<boolean>(false);
    const [messages, setMessages] = React.useState<Array<MessageT>>([]);
    let [messagesPage, setMessagesPage] = React.useState<number>(1);


    const handleScroll = (event:any):void => {
        if (
            messageContainerRef.scrollTop > 0 ||
            isFetching
          )
        return;

        setIsFetching(true);
    };

    const setStatesToInitial = ():void => {
        setMessages([]);
        setMessagesPage(():number => messagesPage = 1);  
    }
    
    const fetchMessages = async (conversationId:string) => {
        setTimeout(async () => {
            await axios.get(`${API_URL}/${conversationId}?count=${messagesCount}&page=${messagesPage}`)
                .then(({ data }:any):void => {
                    data.reverse();
                    setMessages((prevMessages: Array<MessageT>): Array<MessageT> => [...data, ...prevMessages]);
                    setMessagesPage(():number => messagesPage++); 
                })
                .catch((e) => {
                    console.log('fetchMessages', e);
                })
                .finally(() => {
                    setIsFetching(false);
                });
        }, 500);
    }

    React.useEffect(() => {
        setStatesToInitial();
        fetchMessages(conversationId);
        if(!!messageContainerRef){
            messageContainerRef.addEventListener('scroll', handleScroll);
        }
       
        return () => {
            if(!!messageContainerRef)
                messageContainerRef.removeEventListener('scroll', handleScroll);
        }
    }, [conversationId]);

    
    React.useEffect(() => {    
        if (!isFetching) return;
        
        if(!!messageContainerRef)
            fetchMessages(conversationId); 

    }, [isFetching, messageContainerRef]);

    return [messages, setMessages];
}