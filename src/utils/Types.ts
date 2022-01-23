export type initialStateT = {
  UserData: UserDataT;
  ChatsList: Array<ChatsListT>;
  ConversationData: ConversationDataT;
};

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
  messages: Array<MessageT>;
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

export type createConversationT = { sender: string; receiver: string };
