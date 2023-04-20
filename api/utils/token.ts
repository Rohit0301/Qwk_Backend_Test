import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

interface IVerifyPayload{
  session_id: string;
  user_id: string
}

if (!process.env.JWT_TOKEN_SECRET) {
  console.warn("NO JWT_SECRET DEFINED!");
}

export const createAccessToken = (
  payload: string | object,
  options: jwt.SignOptions | null
) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET as string,
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
        if (err) return console.log(err, "error");
        return resolve(encoded as string);
      }
    );
  });
}

export const verifyAccessToken =  (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET as string) as IVerifyPayload;
    return decoded
  } catch (err) {
    throw new Error('Unauthorised');
  }
} 

export const verifyRefreshToken =  (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFREESH_TOKEN_SECRET as string) as IVerifyPayload;
    return decoded
  } catch (err) {
    throw new Error('Invalid Refresh token');
  }
} 