import { ValidationError } from "apollo-server";
import { FieldResolver } from "nexus";
import nookies from "nookies";
import { verifyAccessToken } from "../../utils/token";
import { Context } from "../../types/Context";
import { getHeadersToken, removeUserSession } from "./common";
import { LOGOUT_FAILED, LOGOUT_SUCCESSFULL } from "../../constants/auth";

export const logout: FieldResolver<
    "Query",
    "logout"
> = async (_, __ , { db, req, res }: Context) => {
    try {
        const token = getHeadersToken(req);
        const { session_id } = verifyAccessToken(token);
        await removeUserSession({session_id, db})
        nookies.destroy({res}, "tokens");
        return {
            message: LOGOUT_SUCCESSFULL
        }
    } catch (error) {
        const errMsg = (error as ValidationError).message ||
        LOGOUT_FAILED;
        return {
            error: errMsg,
        };
    }
};
