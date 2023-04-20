import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { FieldResolver } from "nexus";
import { ValidationError } from "apollo-server";
import { createAccessToken, createRefreshToken } from "../../utils/token";
import { createSession, setCookies } from "./common";
import { Context } from "../../types/Context";

export const login: FieldResolver<
    "Mutation",
    "login"
> = async (_, { credentials }: any, { db, res }: Context) => {
    try {
        const existingUser = await getExistingUser(credentials, db);
        const session = await createSession(existingUser, db);
        const accessToken = await createAccessToken(
            { user_id: existingUser.id, session_id: session.id },
            null
        );
        const refreshToken = await createRefreshToken(
            { user_id: existingUser.id, session_id: session.id },
            null
        );
        const tokens = {
            accessToken,
            refreshToken
        }
        setCookies({ tokens: tokens, res })
        return {    
            tokens: tokens,
            user_id: existingUser.id,
        };

    } catch (error) {
        const errMsg = (error as ValidationError).message ||
            "Login attempt failed!";
        return {
            error: errMsg,
        };
    }
};

const getExistingUser = async (
    credentials: {
        email: string;
        password: string;
    },
    db: PrismaClient
) => {
    const existingUser = await db.user.findFirst({
        where: {
            email: credentials.email,
        },
        select: {
            password: true,
            id: true
        },
    });
    const passwordsMatch = await compare(
        credentials.password,
        (existingUser?.password as string) || ""
    );

    if (!existingUser || !passwordsMatch) {
        throw new Error("Incorrect username or password!");
    }

    return existingUser;
};
