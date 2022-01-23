import { MessageT } from "./../../utils/Types";
import axios from "axios";
import { API_URL } from "../../http";
import { TYPE_REDUCER } from "../../utils/constants";
import { ConversationT } from "../../utils/Types";

export const loginUser = (data: any) => ({
  type: TYPE_REDUCER.LOGIN,
  payload: data,
});

export const getAllChats = () => async (dispatch: any) => {
  try {
    const { data } = await axios.get(`${API_URL}/chats`);
    if (!!data) {
      dispatch(setAllChats(data));
    }
  } catch (e) {
    console.log("getAllChats", e);
  }
};

export const setAllChats = (data: any) => ({
  type: TYPE_REDUCER.SET_CHATS,
  payload: data,
});

export const setUserLogin = (data: string) => ({
  type: TYPE_REDUCER.SET_USER_LOGIN,
  payload: data,
});

export const asyncConversationCreation =
  (senderId: string, receiverId: string) => async (dispatch: any) => {
    try {
      const conversationData = await axios.post(`${API_URL}/conversation`, {
        senderId,
        receiverId,
      });

      if (!!conversationData.data) {
        dispatch(createConversation(conversationData.data));
      }
    } catch (e) {
      console.log("asyncConversationCreation", e);
    }
  };

export const createConversation = (data: ConversationT) => ({
  type: TYPE_REDUCER.CREATE_CONVERSATION,
  payload: data,
});

export const chooseConversation = (data: string) => ({
  type: TYPE_REDUCER.CHOOSE_CONVERSATION,
  payload: data,
});

export const asyncGetUserConversation =
  (userId: string) => async (dispatch: any) => {
    try {
      const { data } = await axios.get(`${API_URL}/conversation/${userId}`);

      if (!!data) {
        dispatch(setUserConversation(data));
      }
    } catch (e) {
      console.log("asyncGetUserConversation", e);
    }
  };

export const setUserConversation = (data: Array<ConversationT>) => ({
  type: TYPE_REDUCER.SET_USERS_CONVERSATIONS,
  payload: data,
});

// export const asyncSendMessage =
//   (sender: string, conversationId: string, text: string) =>
//   async (dispatch: any) => {
//     try {
//       const { data } = await axios.post(`${API_URL}/sendMessage`, {
//         conversationId,
//         sender,
//         text,
//       });

//       if (!!data) {
//         console.log("data", data);

//         dispatch(sendMessage(data));
//       }
//     } catch (e) {
//       console.log("asyncSendMessage", e);
//     }
//   };

export const sendMessage = (data: Array<MessageT> | any) => ({
  type: TYPE_REDUCER.SEND_MESSAGE,
  payload: data,
});
