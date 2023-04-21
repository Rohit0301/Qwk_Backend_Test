import { ValidationError } from "apollo-server";
import { hash } from "bcrypt";
import { FieldResolver } from "nexus";
import { registrationValidation } from "../../utils/registrationValidation";
import { createUserSession, generateTokens, setCookies } from "./common";
import { Context } from "../../types/Context";
import { PrismaClient } from "@prisma/client";
import { EMAIL_ALREADY_PRESENT, SIGNUP_FAILED } from "../../constants/auth";
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
    const session = await createUserSession(newUser, db);
    const tokens  = await generateTokens( { user_id: newUser.id, session_id: session.id })
    setCookies({ tokens: tokens, res })
    return {
      tokens: tokens,
      user_id: newUser.id
    };
  } catch (err) {
    const errMsg =
      (err as ValidationError).message || SIGNUP_FAILED;
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
    throw new Error(EMAIL_ALREADY_PRESENT);
  }

  return existingUser;
}

const createNewUser = async ({ user, db }: { user: { email: string, password: string }, db: PrismaClient }) => {
  const newUser = await db.user.create({
    data: user
  })
  return newUser
}