import { AddGroupRequestModel, GroupType } from "../typings/GroupType";
import axios from "./AxiosService";

export const getGroups = async (): Promise<Array<GroupType>> => {
	try {
		const response = await axios.get(`/group/list`);
		return response.data;
		;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const createGroup = async (name: string, userIdList: string): Promise<number> => {
	const data: AddGroupRequestModel = {
		name,
		userIdList: userIdList.replaceAll(" ", "").split(",")
	};
	const response = await axios.post(`/group/add`, data);
	return response.data.groupId;
}