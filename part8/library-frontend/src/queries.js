import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`;

export const query = gql`
  query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`;
