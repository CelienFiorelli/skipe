export type GroupType = {
    id: number;
    name: string;
}

export type AddGroupRequestModel = {
	name: string;
	userIdList: Array<string>;
}