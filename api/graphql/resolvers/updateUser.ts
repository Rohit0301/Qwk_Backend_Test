import { PrismaClient } from "@prisma/client";
import { ValidationError } from "apollo-server";
import { FieldResolver } from "nexus";
import { Context } from "../../types/Context";
import { checkUserSession, getHeadersToken } from "./common";
import { verifyAccessToken } from "../../utils/token";

export const updateUser: FieldResolver<
    "Mutation",
    "updateUser"
> = async (_, { userData }: any, { db, req }: Context) => {
    try {
        const token = getHeadersToken(req);
        const {session_id, user_id} = verifyAccessToken(token);
        await checkUserSession({ session_id, db, user_id})
        await checkUserExist(userData, db, user_id);
        const updatedUser = await updateUserData({userData, db})
        return {
            message: "User updated successfully",
            user: {
                first_name: updatedUser.first_name,
                email: updatedUser.email,
                city: updatedUser.city,
                gender: updatedUser.gender,
            }
        }
    } catch (error) {
        const errMsg = (error as ValidationError).message ||
            "Something went wrong";
        return {
            error: errMsg,
        };
    }
};


const checkUserExist = async (
    { email, id }: { email: string; id: string },
    db: PrismaClient,
    user_id: String
) => {
    const existingUser = await db.user.findFirst({
        where: {
            email: email,
        },
        select: {
            id: true
        },
    });
   
    if (!existingUser) {
        throw new Error("User not found with this email id")
    }
    if(existingUser.id!==user_id){
        throw new Error("Invalid token or email")
    }
    return existingUser;
};

const updateUserData = async ({ userData, db }: { userData: { email: string }, db: PrismaClient }) => {
    const updatedData = await db.user.update({
        data: userData,
        where: {
            email: userData.email
        }
    })
    return updatedData
  }