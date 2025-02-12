import { AddGroupRequestModel, GroupType } from "../typings/GroupType";
import axios from "./AxiosService";

export const getGroups = async (): Promise<Array<GroupType>> => {
	try {
		const response = await axios.get(`/group/list`);
		return response.data.map((g: any) => { return {id: g.group_id} })
		;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const createGroup = async (name: string, userIdList: string): Promise<number> => {
	let data: AddGroupRequestModel = {
		name,
		userIdList: userIdList.replaceAll(" ", "").split(",")
	};
	const response = await axios.post(`/group/add`, data);
	return response.data.groupId;
}