import { TYPE_REDUCER } from "../../utils/constants";
import { ConversationT, initialStateT, MessageT } from "../../utils/Types";

const initialState: initialStateT = {
  UserData: {
    userLogin: "",
  },
  ChatsList: [],
  ConversationData: {
    ActiveConversation: { _id: "", members: [], messages: [] },
    ConversationList: [],
  },
};

export const Settings = (state: initialStateT = initialState, action: any) => {
  switch (action.type) {
    case TYPE_REDUCER.SET_CHATS: {
      return {
        ...state,
        ChatsList: action.payload,
      };
    }
    case TYPE_REDUCER.SET_USER_LOGIN: {
      return {
        ...state,
        UserData: {
          ...state.UserData,
          userLogin: action.payload,
        },
      };
    }
    case TYPE_REDUCER.CREATE_CONVERSATION: {
      return {
        ...state,
        ConversationData: {
          ActiveConversation: action.payload,
          ConversationList: [
            ...state.ConversationData.ConversationList,
            action.payload,
          ],
        },
      };
    }

    case TYPE_REDUCER.SET_USERS_CONVERSATIONS: {
      return {
        ...state,
        ConversationData: {
          ...state.ConversationData,
          ConversationList: action.payload,
        },
      };
    }
    case TYPE_REDUCER.CHOOSE_CONVERSATION: {
      const { id, messagesData }: { id: string, messagesData: Array<MessageT> } = action.payload;
      const ConversationListCopied: Array<ConversationT> = JSON.parse(
        JSON.stringify(state.ConversationData.ConversationList)
      );

      let activeConversation: ConversationT = {
        _id: "",
        members: [],
        messages: [],
      };
      ConversationListCopied.forEach((conversation: ConversationT) => {
        if (conversation._id === id) {

          activeConversation._id = conversation._id;
          activeConversation.members = conversation.members;

          if (Array.isArray(messagesData) && messagesData.length > 0) {
            activeConversation.messages = messagesData;
          } else {
            conversation = { ...conversation, messages: [] };
            activeConversation.messages = [];
          }
        }
      });

      return {
        ...state,
        ConversationData: {
          ...state.ConversationData,
          ActiveConversation: activeConversation,
        },
      };
    }
    case TYPE_REDUCER.SEND_MESSAGE: {
      const messageData: MessageT = action.payload;

      const ActiveConversationCopied: ConversationT = JSON.parse(
        JSON.stringify(state.ConversationData.ActiveConversation)
      );
      
      ActiveConversationCopied.messages.push(messageData);

      return {
        ...state,
        ConversationData: {
          ...state.ConversationData,
          ActiveConversation: ActiveConversationCopied,
        },
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
