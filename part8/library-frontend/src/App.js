import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');

  const authorsResult = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  });

  const booksResult = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  });

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authorsResult.data?.allAuthors}
      />

      <Books show={page === 'books'} books={booksResult.data?.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  );
};

export default App;