import { ValidationError } from "apollo-server";
import { hash } from "bcrypt";
import { FieldResolver } from "nexus";
import { createAccessToken, createRefreshToken } from "../../utils/token";
import { registrationValidation } from "../../utils/registrationValidation";
import { createSession, setCookies } from "./common";
import { Context } from "../../types/Context";
import { PrismaClient } from "@prisma/client";
export const createAccount: FieldResolver<
  "Mutation",
  "createAccount"
> = async (_, { credentials }, { db, res }: Context) => {
  try {
    await registrationValidation.validate(credentials);
    await checkUserExists({ credentials, db })
    const hashedPassword = await hash(credentials.password, 7);

    const user = {
      email: credentials.email,
      password: hashedPassword,
    };
    const newUser = await createNewUser({ user, db })
    const session = await createSession(newUser, db);
    const refreshToken = await createRefreshToken(
      { user_id: newUser.id, session_id: session.id }, null);
    const accessToken = await createAccessToken(
      { user_id: newUser.id, session_id: session.id }, null
    );
    const tokens = {
      refreshToken,
      accessToken
    }
    setCookies({ tokens: tokens, res })
    return {
      tokens: tokens,
      user_id: newUser.id
    };
  } catch (err) {
    const errMsg =
      (err as ValidationError).message || "Invalid Input";
    return {
      error: errMsg,
    };
  }
};

const checkUserExists = async ({ db, credentials }: { db: PrismaClient, credentials: { email: string } }) => {
  const existingUser = await db.user.findFirst({
    where: {
      email: credentials.email,
    },
  });
  if (existingUser !== null) {
    throw new Error("Email already taken!");
  }

  return existingUser;
}

const createNewUser = async ({ user, db }: { user: { email: string, password: string }, db: PrismaClient }) => {
  const newUser = await db.user.create({
    data: user
  })
  return newUser
}