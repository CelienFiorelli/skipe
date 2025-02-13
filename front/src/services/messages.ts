import { MessageType } from "../typings/MessageType";
import axios from "./AxiosService";

export const getMessages = async (groupId: number): Promise<MessageType[]> => {
    try {
        const response = await axios.get(`/message/list/${groupId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const createMessage = async (groupId: number, content: string): Promise<MessageType> => {
    try {
        const response = await axios.post(`/message/add`, {
            content: content,
            group_id: groupId
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const editMessage = async (messageId: number, field: Object): Promise<MessageType> => {
    try {
        const response = await axios.put(`/message/${messageId}`, field);
        return response.data.message;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const deleteMessage = async (messageId: number): Promise<boolean> => {
    try {
        await axios.delete(`/message/${messageId}`);
        return true;
    } catch (error: any) {
        throw new Error(error);
    }
};
