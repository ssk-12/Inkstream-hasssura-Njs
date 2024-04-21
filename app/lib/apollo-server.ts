import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT
});

const authLink = setContext((_, { headers }) => {
  // Ensure this is used only on the server-side for security
  const adminSecret = typeof window === 'undefined' ? process.env.HASURA_GRAPHQL_ADMIN_SECRET : '';

  return {
    headers: {
      ...headers,
      ...(adminSecret && { 'x-hasura-admin-secret': adminSecret }),
    }
  };
});

const ssrMode = typeof window === 'undefined'; // Enable SSR mode only on the server

export const serverClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  ssrMode: ssrMode
});
