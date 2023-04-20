import { PrismaClient } from "@prisma/client";
import { IRequest } from "../../types/Context";
import nookies from "nookies";

interface ITokens{
    accessToken: String;
    refreshToken: String
}

export const createSession = async (user: { id: string }, db: PrismaClient) => {
    const session = await db.session.create({
        data: {
            user_id: user.id
        }
    })
    return session;
}

export const removeUserSession = async ({ session_id, db }: { session_id: string; db: PrismaClient }) => {
    try {
        await db.session.delete({
            where: {
                id: session_id
            }
        })
    }
    catch (err) {
        throw new Error("Invalid Session");
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
            throw new Error("Invalid session!");
        }
    }
    catch (err) {
        throw new Error("Session error!")
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