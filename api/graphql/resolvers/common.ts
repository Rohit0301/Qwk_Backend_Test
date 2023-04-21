import { PrismaClient } from "@prisma/client";
import { IRequest } from "../../types/Context";
import nookies from "nookies";
import { createAccessToken, createRefreshToken } from "../../utils/token";
import { INVALID_SESSION, SESSION_ERROR } from "../../constants/auth";

interface ITokens{
    accessToken: String;
    refreshToken: String
}

export const createUserSession = async (user: { id: string }, db: PrismaClient) => {
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
        throw new Error(INVALID_SESSION);
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
    catch (err) {
        throw new Error(SESSION_ERROR)
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

export const generateTokens = async(payload: { user_id: string, session_id: string }) => {
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