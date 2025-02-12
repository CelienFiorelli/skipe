import { MessageType } from "../typings/MessageType";
import axios from "./AxiosService";

type getMessagesResponseType = {
    messages: Array<MessageType>;
    firstMessageId: number;
    lastMessageId: number;
}
export const getMessages = async (conversationId: number, queryParameter: Record<string, string | number> = {}): Promise<getMessagesResponseType> => {
    try {
        const queryString = Object.keys(queryParameter)
            .map((key: string) => `${key}=${queryParameter[key]}`)
            .join('&');

        const response = await axios.get(`/conversations/${conversationId}/messages?${queryString}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const createMessage = async (conversationId: number, content: string): Promise<MessageType> => {
    try {
        const response = await axios.post(`/conversations/${conversationId}/messages`, {
            content: content
        });
        return response.data.message;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const editMessage = async (messageId: number, field: Object): Promise<MessageType> => {
    try {
        const response = await axios.put(`/messages/${messageId}`, field);
        return response.data.message;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const deleteMessage = async (messageId: number): Promise<boolean> => {
    try {
        await axios.delete(`/messages/${messageId}`);
        return true;
    } catch (error: any) {
        throw new Error(error);
    }
};
