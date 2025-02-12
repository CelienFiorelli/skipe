export type LoginRequestModel = {
    email: string;
    password: string;
}

export type RegisterRequestModel = {
    pseudo: string;
    email: string;
    password: string;
}

export interface User {
    id: number;
    pseudo: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}