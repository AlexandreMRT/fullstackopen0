import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { query } from './queries';

import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
});

client.query({ query }).then((response) => {
  console.log(response.data);
});
ReactDOM.render(<App />, document.getElementById('root'));
