import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { serverClient } from './apollo-server';
import { FIND_USER_BY_EMAIL_QUERY, CREATE_USER_MUTATION } from './graphql-operations';
import { NextApiRequest, NextApiResponse } from 'next';

const verifyPassword = async (userPassword: string, inputPassword: string): Promise<boolean> => {
  return bcrypt.compare(inputPassword, userPassword);
};

const createUser = async (email: string, password: string, name: string) => {
  const password_hash = bcrypt.hashSync(password, 10);
  const { data } = await serverClient.mutate({
    mutation: CREATE_USER_MUTATION,
    variables: {
      email,
      password: password_hash,
      name
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
        name: { label: "Name", type: "text", placeholder: "Not compulsory" },
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

        const user = data.User[0];

        if (!user) {
          return await createUser(credentials.email, credentials.password, credentials.name);
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
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  secret: process.env.JWT_SECRET,
};

const authHandler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);

export default authHandler;
