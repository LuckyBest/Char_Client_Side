export type initialStateT = {
  interfaceInfo:interfaceInfoT;
  UserData: UserDataT;
  ChatsList: Array<ChatsListT>;
  ConversationData: ConversationDataT;
};


export type interfaceInfoT = {
  isChatsListShown:boolean;
}

export type UserDataT = {
  userLogin: string;
};

export type ChatsListT = {
  _id: string;
  login: string;
  password: string;
  _v: number;
};

export type ConversationDataT = {
  ActiveConversation: ConversationT;
  ConversationList: Array<ConversationT>;
};

export type ConversationT = {
  _id: string;
  members: string[];
  _v?: number;
};

export type MessageT = {
  sender: string;
  text: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type UserCredentialsT = {
  login: string;
  password: string;
};


export type MessageComponentT = {
  userLogin: string;
  text: string;
};

export type createConversationT = { sender: string; receiver: string };
