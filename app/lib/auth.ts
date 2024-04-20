// lib/auth.ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { serverClient } from './apollo-server';
import bcrypt from 'bcrypt';
import { User, AuthSession } from '../types/authTypes';
import { FIND_USER_BY_EMAIL_QUERY, CREATE_USER_MUTATION } from './graphql-operations';
import { NextApiRequest, NextApiResponse } from 'next';

const verifyPassword = async (userPassword: string, inputPassword: string): Promise<boolean> => {
  return bcrypt.compare(inputPassword, userPassword);
};

const createUser = async (email: string, password: string): Promise<User | null> => {
  const password_hash = bcrypt.hashSync(password, 10);
  const { data } = await serverClient.mutate({
    mutation: CREATE_USER_MUTATION,
    variables: {
      email,
      password: password_hash
    }
  });
  if (data.insert_User_one) {
    return {
      id: data.insert_User_one.id,
      email: data.insert_User_one.email
    };
  }
  return null;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const { data } = await serverClient.query({
          query: FIND_USER_BY_EMAIL_QUERY,
          variables: { email: credentials.email },
          fetchPolicy: 'network-only'
        });

        const user = data.User[0] as User | undefined;

        if (!user) {
          return await createUser(credentials.email, credentials.password);
        } else {
          if (await verifyPassword(user.password || '', credentials.password)) {
            return { id: user.id, name: user.name, email: user.email };
          }
          return null;
        }
      }
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.sub as string;
      }
      return session as AuthSession;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.id; // JWT sub field will contain user ID
      }
      return token;
    }
  },
  secret: process.env.JWT_SECRET,
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
