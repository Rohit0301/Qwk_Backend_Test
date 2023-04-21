import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
import { INVALID_ACCESS_TOKEN, INVALID_REFRESH_TOKEN } from "../constants/auth";
import { ValidationError } from "apollo-server";
dotenv.config()

interface IVerifyPayload {
  session_id: string;
  user_id: string;
  exp: number;
}

if (!process.env.JWT_ACCESS_TOKEN_SECRET || !process.env.JWT_REFRESH_TOKEN_SECRET) {
  console.warn("NO JWT_SECRET DEFINED!");
}

export const createAccessToken = (
  payload: string | object,
  options: jwt.SignOptions | null
) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        ...options
      },
      (err, encoded) => {
        if (err) return reject(err);
        return resolve(encoded as string);
      }
    );
  });
};

export const createRefreshToken = (payload: string | object, options: jwt.SignOptions | null) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        ...options
      },
      (err, encoded) => {
        if (err) return reject(err);
        return resolve(encoded as string);
      }
    );
  });
}

export const verifyAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET as string) as IVerifyPayload;
    return decoded
  } catch (error) {
    const errMsg = (error as ValidationError).message ||
      INVALID_ACCESS_TOKEN;
    throw new Error(errMsg);
  }
}

export const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET as string) as IVerifyPayload;
    return decoded
  } catch (error) {
    const errMsg = (error as ValidationError).message ||
      INVALID_REFRESH_TOKEN;
    throw new Error(errMsg);
  }
}
