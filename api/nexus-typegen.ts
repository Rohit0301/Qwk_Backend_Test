/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./types/Context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  refreshTokenData: { // input type
    refreshToken: string; // String!
  }
  userCredentials: { // input type
    email: string; // String!
    password: string; // String!
  }
  userData: { // input type
    city?: string | null; // String
    first_name?: string | null; // String
    gender?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Mutation: {};
  Query: {};
  loginResponse: { // root type
    error?: string | null; // String
    tokens?: NexusGenRootTypes['tokens'] | null; // tokens
    user_id?: string | null; // String
  }
  logoutResponse: { // root type
    error?: string | null; // String
    message?: string | null; // String
  }
  refreshTokenResponse: { // root type
    error?: string | null; // String
    tokens?: NexusGenRootTypes['tokens'] | null; // tokens
  }
  registerResponse: { // root type
    error?: string | null; // String
    tokens?: NexusGenRootTypes['tokens'] | null; // tokens
    user_id?: string | null; // String
  }
  tokens: { // root type
    accessToken: string; // String!
    refreshToken: string; // String!
  }
  updatedUserResponse: { // root type
    error?: string | null; // String
    message?: string | null; // String
    user?: NexusGenRootTypes['user'] | null; // user
  }
  user: { // root type
    city?: string | null; // String
    email?: string | null; // String
    first_name?: string | null; // String
    gender?: string | null; // String
    id?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createAccount: NexusGenRootTypes['registerResponse'] | null; // registerResponse
    login: NexusGenRootTypes['loginResponse'] | null; // loginResponse
    updateUser: NexusGenRootTypes['updatedUserResponse'] | null; // updatedUserResponse
  }
  Query: { // field return type
    logout: NexusGenRootTypes['logoutResponse'] | null; // logoutResponse
    refreshToken: NexusGenRootTypes['refreshTokenResponse'] | null; // refreshTokenResponse
  }
  loginResponse: { // field return type
    error: string | null; // String
    tokens: NexusGenRootTypes['tokens'] | null; // tokens
    user_id: string | null; // String
  }
  logoutResponse: { // field return type
    error: string | null; // String
    message: string | null; // String
  }
  refreshTokenResponse: { // field return type
    error: string | null; // String
    tokens: NexusGenRootTypes['tokens'] | null; // tokens
  }
  registerResponse: { // field return type
    error: string | null; // String
    tokens: NexusGenRootTypes['tokens'] | null; // tokens
    user_id: string | null; // String
  }
  tokens: { // field return type
    accessToken: string; // String!
    refreshToken: string; // String!
  }
  updatedUserResponse: { // field return type
    error: string | null; // String
    message: string | null; // String
    user: NexusGenRootTypes['user'] | null; // user
  }
  user: { // field return type
    city: string | null; // String
    email: string | null; // String
    first_name: string | null; // String
    gender: string | null; // String
    id: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    createAccount: 'registerResponse'
    login: 'loginResponse'
    updateUser: 'updatedUserResponse'
  }
  Query: { // field return type name
    logout: 'logoutResponse'
    refreshToken: 'refreshTokenResponse'
  }
  loginResponse: { // field return type name
    error: 'String'
    tokens: 'tokens'
    user_id: 'String'
  }
  logoutResponse: { // field return type name
    error: 'String'
    message: 'String'
  }
  refreshTokenResponse: { // field return type name
    error: 'String'
    tokens: 'tokens'
  }
  registerResponse: { // field return type name
    error: 'String'
    tokens: 'tokens'
    user_id: 'String'
  }
  tokens: { // field return type name
    accessToken: 'String'
    refreshToken: 'String'
  }
  updatedUserResponse: { // field return type name
    error: 'String'
    message: 'String'
    user: 'user'
  }
  user: { // field return type name
    city: 'String'
    email: 'String'
    first_name: 'String'
    gender: 'String'
    id: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createAccount: { // args
      credentials: NexusGenInputs['userCredentials']; // userCredentials!
    }
    login: { // args
      credentials: NexusGenInputs['userCredentials']; // userCredentials!
    }
    updateUser: { // args
      userData: NexusGenInputs['userData']; // userData!
    }
  }
  Query: {
    refreshToken: { // args
      payload: NexusGenInputs['refreshTokenData']; // refreshTokenData!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}