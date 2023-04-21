export interface ITokens {
    accessToken: String;
    refreshToken: String
}

export interface IUser{
    email: string;
    id: string;
    first_name: string | null;
    city: string | null;
    gender: string | null;
}