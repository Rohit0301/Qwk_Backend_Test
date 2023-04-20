import { ApolloServer } from 'apollo-server';
import { schema } from '../graphql/schema';
import { db } from './db';

export const server = new ApolloServer({ schema,   context: ({ req, res }) => ({ req, res, db }), });