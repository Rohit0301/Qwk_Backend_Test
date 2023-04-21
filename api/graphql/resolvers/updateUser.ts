import { PrismaClient } from "@prisma/client";
import { ValidationError } from "apollo-server";
import { FieldResolver } from "nexus";
import { Context } from "../../types/Context";
import { checkUserExistByID, checkUserSession, getHeadersToken } from "./common";
import { verifyAccessToken } from "../../utils/token";
import { SOMETHING_WENT_WRONG, USER_ID_NOT_FOUND, USER_UPDATE_SUCCESSFULL } from "../../constants/auth";
import { IUser } from "../../types/auth";



export const updateUser: FieldResolver<
    "Mutation",
    "updateUser"
> = async (_, { userData }: any, { db, req }: Context) => {
    try {
        const token = getHeadersToken(req);
        const { session_id, user_id } = verifyAccessToken(token);
        await checkUserSession({ session_id, db, user_id })
        await checkUserExistByID(user_id, db);
        const updatedUser = await updateUserData({ userData, db, user_id })
        console.log("User updated successfully: ", updateUser);
        return {
            message: USER_UPDATE_SUCCESSFULL,
            user: {
                ...updatedUser
            }
        }
    } catch (error) {
        const errMsg = (error as ValidationError).message ||
            SOMETHING_WENT_WRONG
        console.log("User updation error: ", errMsg);
        return {
            error: errMsg,
        };
    }
};


const updateUserData = async ({ userData, db, user_id }: { userData: { email: string }, db: PrismaClient, user_id: string }) => {
    try {
        const updatedData = await db.user.update({
            data: userData,
            where: {
                id: user_id
            },
            select: {
                id: true,
                city: true,
                gender: true,
                first_name: true,
                email: true
            }
        }) as IUser
        return updatedData
    }
    catch (error) {
        const errMsg = (error as ValidationError).message ||
            USER_ID_NOT_FOUND;
        throw new Error(errMsg)
    }
}