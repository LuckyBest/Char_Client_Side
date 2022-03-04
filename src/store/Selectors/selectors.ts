import {
  ChatsListT,
  ConversationDataT,
  ConversationT,
  initialStateT,
  UserDataT,
} from "../../utils/Types";

export const getAllChatsData = ({ ...state }): Array<ChatsListT> => {
  const chats: Array<ChatsListT> = state.Configurations.ChatsList;
  return chats;
};

export const getUserData = ({ ...state }): UserDataT => {
  const { UserData }: { UserData: UserDataT } = state.Configurations;
  return UserData;
};

export const isConversation =
  (senderId: string, receiverId: string) =>
  ({ ...state }): ConversationT => {
    const { ConversationList }: { ConversationList: Array<ConversationT> } =
      state.Configurations.ConversationData;

    let isConversation = {} as ConversationT;
    if (!!ConversationList) {
      isConversation = ConversationList.filter(
        (conversation: ConversationT) =>
          !!conversation.members &&
          conversation.members.includes(senderId) &&
          conversation.members.includes(receiverId)
      )[0];
      return isConversation;
    }

    return isConversation;
  };

export const getConversationData = ({ ...state }): ConversationDataT => {
  const { ConversationData }: { ConversationData: ConversationDataT } =
    state.Configurations;

  return ConversationData;
};


export const getReceiverNickname = ({...state}):string => {
  const Configurations:initialStateT = state.Configurations;
  const userName:string = Configurations.UserData.userLogin;
  const activeConversationMembers:string[] = Configurations.ConversationData.ActiveConversation.members;
  const receiverNickname:string = activeConversationMembers.filter((nickName:string) => nickName !== userName)[0];
  
  return receiverNickname;
}