import { PrismaClient } from "@prisma/client";

export interface IRequest{
  headers: { authorization: string }
}

export interface Context {
  req: IRequest;
  res: Response;
  db: PrismaClient;
}