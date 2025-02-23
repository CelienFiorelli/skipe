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

export const createMessage = async (groupId: number, content: string, file: File | undefined): Promise<MessageType> => {
	try {
		const formData = new FormData();
		if (file) formData.append("file", file);
		formData.append("content", content);
		formData.append("group_id", groupId.toString());
		const response = await axios.post(`/message/add`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data"
				}
			});
		return response.data;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getMessageImage = async (path: string): Promise<string> => {
	try {
		const response = await axios.get(`/message/file?path=${path}`,
			{responseType: "blob"}
		);
		return URL.createObjectURL(response.data);
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
