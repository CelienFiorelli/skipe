export type MessageType = {
	id: number;
	user: UserType;
	group_id: number;
	content: string;
	is_file: boolean;
	created_at: string;
	updated_at: string;
}

type UserType = {
	id: number;
	pseudo: string;
}