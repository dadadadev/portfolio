import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const headersLink = new ApolloLink((operation, forwrd) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
  });
  return forwrd(operation);
});

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' });
const link = ApolloLink.from([headersLink, httpLink]);
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
});

export default client;
