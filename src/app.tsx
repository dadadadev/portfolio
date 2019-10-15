import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import {
  ApolloProvider,
  useQuery,
} from '@apollo/react-hooks';

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

const GISTS = gql`
  { 
    user(login: "dadadadev") {
      gists(first: 10) {
        nodes {
          files {
            encodedName
            encoding
            extension
            name
            size
            text
          }
        }
      }
    }
  }
`;

const App = () => {
  const {
    loading,
    error,
    data
  } = useQuery(GISTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>something wrong</p>;
  
  const gists = data.user.gists.nodes;
  return (
    <>
      {gists.map(gist => (
        gist.files.map((data, i) => (
          <React.Fragment key={i}>
            <div>{data.name}</div>
          </React.Fragment>
        )
      )))}
    </>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <h1>hello, tsx with parcel</h1>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
);
