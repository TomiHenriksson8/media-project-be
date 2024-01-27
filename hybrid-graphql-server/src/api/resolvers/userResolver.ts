import { User, UserWithNoPassword } from "@sharedTypes/DBTypes"
import { fetchData } from "../../lib/functions";
import { UserDeleteResponse, UserResponse } from "@sharedTypes/MessageTypes";
import { MyContext } from "../../local-types";

export default {
  MediaItem: {
    owner: async (parent: {user_id: string}) => {
      const user = await fetchData<UserWithNoPassword>(process.env.AUTH_SERVER + '/users/' + parent.user_id);
      return user;
    }
  },
  Query : {
    users: async () => {
      const users = await fetchData<UserWithNoPassword[]>(
        process.env.AUTH_SERVER + '/users',
      );
      return users;
    },
    user: async (_parent: undefined, args: {user_id: string}) => {
      const user = await fetchData<UserWithNoPassword>(process.env.AUTH_SERVER + '/users/' + args.user_id);
      return user;
    },
    checkToken : async (_parent: undefined, args: {token: string}) => {
      const checkT = await fetchData(process.env.AUTH_SERVER + '/users/token', {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + args.token,
        },
      })
    },
    checkEmail : async (_parent: undefined, args: {email: string}) => {
      const checkE = await fetchData(process.env.AUTH_SERVER + `/users/email/${args.email}`);
      return checkE;
    },
    checkUsername : async (_parent: undefined, args: {username: string}) => {
      const checkU = await fetchData(process.env.AUTH_SERVER + `/users/username/${args.username}`);
      return checkU;
    },
  },
  Mutation: {
    createUser: async (
      _parent: undefined,
      args: {input: Pick<User, 'username' | 'email' | 'password'>},
    ) => {
      const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(args.input),
        headers: {'Content-Type': 'application/json'},
      };
      const user = await fetchData<UserResponse>(
        process.env.AUTH_SERVER + '/users',
        options,
      );
      return user;
    },
    login: async (_parent: undefined, args: Pick<User, 'username' | 'password'>) => {
      const options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(args),
      };
      const user = await fetchData<UserWithNoPassword>(
          process.env.AUTH_SERVER + '/auth/login', options
          );
      return user;
  },
  updateUser: async (_parent: undefined, args: {input: Pick<User, 'username' | 'email' | 'password' >}, context: MyContext) => {
    if (!context.user) {
      return;
    }
    const token = context.user.token
    if (!token) {
      throw new Error('No token provided');
    }
    const options = {
      method: 'PUT',
      headers: {
         'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(args.input),
    };
    const user = await fetchData(
      process.env.AUTH_SERVER + '/users', options
    );
    const uUser = await fetchData<UserWithNoPassword>(process.env.AUTH_SERVER + '/users/' + context.user.user_id);
    return uUser;
  },
  deleteUser: async (_parent: undefined, _args: {}, context: MyContext) => {
    if (!context.user || !context.user.token) {
      throw new Error('Authentication required');
    }

    const token = context.user.token;
    const userId = context.user.user_id;

    const uUser: User = await fetchData(process.env.AUTH_SERVER + '/users/' + userId);
    if (!uUser) {
      throw new Error('User not found');
    }
    const deleteOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      await fetchData(`${process.env.AUTH_SERVER}/users`, deleteOptions);

      return {
        success: true,
        message: "User deleted",
        user: { id: uUser.user_id }, 
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete user');
    }
  },

  },
}
