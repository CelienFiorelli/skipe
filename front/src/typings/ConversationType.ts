import { SimpleUserType } from "./SimpleUserType";

type lastMessageType = {
    content: string;
    createdAt: string;
}

export type ConversationType = {
    id: number;
    buyer: SimpleUserType;
    seller: SimpleUserType;
    lastMessage: lastMessageType | null;
}