import { ValidationError } from "apollo-server";
import { FieldResolver } from "nexus";
import { createAccessToken, verifyRefreshToken } from "../../utils/token";
import { Context } from "../../types/Context";
import { setCookies } from "./common";

export const refreshToken: FieldResolver<
    "Query",
    "refreshToken"
> = async (_, { payload } , { res }: Context) => {
    try {
        const {session_id, user_id} = verifyRefreshToken(payload.refreshToken);
        const accessToken = await createAccessToken({user_id, session_id}, null)
        const tokens = {
            accessToken,
            refreshToken: payload.refreshToken
        }
        setCookies({tokens, res});
        return {
           tokens
        }
    } catch (error) {
        const errMsg = (error as ValidationError).message ||
            "Token refresh attempt failed!";
        return {
            error: errMsg,
        };
    }
};
