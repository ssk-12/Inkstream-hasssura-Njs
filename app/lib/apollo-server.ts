import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT
});

const authLink = setContext((_, { headers }) => {
  // Ensure headers and environment variables are correctly typed
  const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET ?? '';

  return {
    headers: {
      ...headers,
      'x-hasura-admin-secret': adminSecret
    }
  };
});

export const serverClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  ssrMode: true // Enable server-side rendering mode
});
