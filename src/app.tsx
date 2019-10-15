import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './client';
import GistList from './GistList';

ReactDOM.render(
  <ApolloProvider client={client}>
    <div>hello, tsx with parcel</div>
    <GistList />
  </ApolloProvider>,
  document.getElementById('app')
);
