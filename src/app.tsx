import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './client';
import GistList from './components/GistList';

ReactDOM.render(
  <ApolloProvider client={client}>
    <GistList />
  </ApolloProvider>,
  document.getElementById('app')
);
