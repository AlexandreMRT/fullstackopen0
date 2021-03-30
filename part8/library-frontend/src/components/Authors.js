import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR } from '../queries';

const Authors = (props) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR);

  if (!props.show) {
    return null;
  }
  const authors = props.authors;

  const handleSubmit = async (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name, setBornTo: parseInt(born) },
    });

    setName('');
    setBorn('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set year of birth</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <select onChange={({ target }) => setName(target.value)}>
            <option value='-----'>-----</option>
            {authors.map((author, index) => (
              <option key={index} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>edit author</button>
      </form>
    </div>
  );
};

export default Authors;
