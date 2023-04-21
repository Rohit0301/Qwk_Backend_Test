import {
  extendType,
  inputObjectType,
  nonNull,
  objectType,
} from "nexus";
import { createAccount } from "../resolvers/createAccount";
import { login } from "../resolvers/login";
import { updateUser } from "../resolvers/updateUser";
import { logout } from "../resolvers/logout";
import { refreshToken } from "../resolvers/refreshToken";


// Mutation or query
export const CreateAccount = extendType({
  type: "Mutation",
  definition: t => {
    t.field("createAccount", {
      type: RegisterResponse,
      args: { credentials: nonNull(Credentials) },
      resolve: createAccount,
    });
  },
});

export const UpdateUser = extendType({
  type: "Mutation",
  definition: t => {
    t.field("updateUser", {
      type: UpdateUserResponse,
      args: { userData: nonNull(UserData) },
      resolve: updateUser
    })
  }
})

export const Login = extendType({
  type: "Mutation",
  definition: t => {
    t.field("login", {
      type: LoginResponse,
      args: { credentials: nonNull(Credentials) },
      resolve: login,
    });
  },
});

export const Logout = extendType({
  type: "Query",
  definition: t => {
    t.field("logout", {
      type: LogoutResponse,
      resolve: logout,
    });
  },
});

export const RefreshToken = extendType({
  type: "Query",
  definition: t => {
    t.field("refreshToken", {
      type: RefreshTokenResponse,
      args: {payload: nonNull(RefreshTokenData)},
      resolve: refreshToken,
    });
  }
})


// object type
const LogoutResponse = objectType({
  name: "logoutResponse",
  definition: t => {
    t.string("error")
    t.string("message")
  }
})


const LoginResponse = objectType({
  name: "loginResponse",
  definition: t => {
    t.string("error");
    t.field("tokens", {
      type: TokensType
    });
    t.string("user_id");
  },
});

const RegisterResponse = objectType({
  name: "registerResponse",
  definition: t => {
    t.field("tokens", {
      type: TokensType
    });
    t.string("user_id");
    t.string("error");
  },
});

const UpdateUserResponse = objectType({
  name: "updatedUserResponse",
  definition: t => {
    t.string("error");
    t.string("message")
    t.field('user', {
      type: UserType
    })
  }
})

const UserType = objectType({
  name: "user",
  definition: t => {
    t.string("id")
    t.string("email");
    t.string("first_name")
    t.string("city");
    t.string("gender")
  }
})

const RefreshTokenResponse = objectType({
  name: "refreshTokenResponse",
  definition: t => {
    t.string("error");
    t.field('tokens', {
      type: TokensType
    })
  }
})

const TokensType = objectType({
  name: "tokens",
  definition: t =>{
    t.nonNull.string("accessToken");
    t.nonNull.string("refreshToken");
  }
})


// input object type
const Credentials = inputObjectType({
  name: "userCredentials",
  definition: t => {
    t.nonNull.string("email");
    t.nonNull.string("password");
  },
});

const UserData = inputObjectType({
  name: "userData",
  definition: t => {
    t.string("city");
    t.string("first_name");
    t.string("gender");
  }
})

const RefreshTokenData = inputObjectType({
  name: "refreshTokenData",
  definition: t => {
    t.nonNull.string("refreshToken");
  }
})

