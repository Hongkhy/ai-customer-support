export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
};