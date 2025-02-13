export type GroupType = {
    id: number;
    name: string;
    users: Array<string>
}

export type AddGroupRequestModel = {
	name: string;
	userIdList: Array<string>;
}