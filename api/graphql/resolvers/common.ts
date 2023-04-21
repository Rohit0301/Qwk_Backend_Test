import { PrismaClient } from "@prisma/client";
import { IRequest } from "../../types/Context";
import nookies from "nookies";
import { createAccessToken, createRefreshToken } from "../../utils/token";
import { INVALID_EMAIL_OR_TOKEN, INVALID_SESSION, SESSION_ERROR, SOMETHING_WENT_WRONG, USER_ID_NOT_FOUND } from "../../constants/auth";
import { ValidationError } from "apollo-server";
import { ITokens } from "../../types/auth";


export const createUserSession = async (user: { id: string }, db: PrismaClient) => {
    try {
        const session = await db.session.create({
            data: {
                user_id: user.id
            }
        })
        return session;
    }
    catch (error) {
        const errMsg = (error as ValidationError).message ||
            SOMETHING_WENT_WRONG;
        throw new Error(errMsg)
    }

}

export const removeUserSession = async ({ session_id, db }: { session_id: string; db: PrismaClient }) => {
    try {
        await db.session.delete({
            where: {
                id: session_id
            }
        })
    }
    catch (error) {
        const errMsg = (error as ValidationError).message ||
            INVALID_SESSION;
        throw new Error(errMsg);
    }
}

export const checkUserSession = async ({ session_id, user_id, db }: {
    session_id: string;
    user_id: string;
    db: PrismaClient
}) => {
    try {
        const userSession = await db.session.findFirst({
            where: {
                id: session_id,
                user_id: user_id
            }
        })
        if (userSession === null) {
            throw new Error(INVALID_SESSION);
        }
    }
    catch (error) {
        const errMsg = (error as ValidationError).message ||
            SESSION_ERROR;
        throw new Error(errMsg)
    }
}

export const getHeadersToken = (req: IRequest) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    return token;
}

export const setCookies = ({ tokens, res }: { tokens: ITokens; res: Response }) => {
    nookies.set({ res }, "tokens", JSON.stringify(tokens), {
        httpOnly: true,
        domain: process.env.SERVER_DOMAIN || undefined,
        sameSite: true,
    });
}

export const generateTokens = async (payload: { user_id: string, session_id: string }) => {
    const refreshToken = await createRefreshToken(
        payload, null);
    const accessToken = await createAccessToken(
        payload, null
    );
    const tokens = {
        refreshToken,
        accessToken
    }
    return tokens
}

export const checkUserExistByID = async (
    user_id: string,
    db: PrismaClient
) => {
    try {
        const existingUser = await db.user.findUnique({
            where: {
                id: user_id,
            },
        });

        if (!existingUser) {
            throw new Error(USER_ID_NOT_FOUND)
        }
        return existingUser;
    }
    catch (error) {
        const errMsg = (error as ValidationError).message ||
            USER_ID_NOT_FOUND;
        throw new Error(errMsg)
    }

};
