import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { FieldResolver } from "nexus";
import { ValidationError } from "apollo-server";
import { createUserSession, generateTokens, setCookies } from "./common";
import { Context } from "../../types/Context";
import { INCORRECT_CREDENTIALS, LOGIN_FAILED } from "../../constants/auth";

export const login: FieldResolver<
    "Mutation",
    "login"
> = async (_, { credentials }: any, { db, res }: Context) => {
    try {
        const existingUser = await getExistingUser(credentials, db);
        const session = await createUserSession(existingUser, db);
        const tokens  = await generateTokens( { user_id: existingUser.id, session_id: session.id })
        setCookies({ tokens: tokens, res })
        console.log("Login successfull: ", tokens); 
        return {    
            tokens: tokens,
            user_id: existingUser.id,
        };
    } catch (error) {
        const errMsg = (error as ValidationError).message ||
            LOGIN_FAILED;
        console.log("Login error: ", errMsg)
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
        throw new Error(INCORRECT_CREDENTIALS);
    }

    return existingUser;
};
