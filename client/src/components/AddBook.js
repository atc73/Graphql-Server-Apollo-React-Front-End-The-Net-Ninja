import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';

const AddBook = props => {
  const [values, setValues] = useState({ name: '', genre: '', authorId: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submitForm = e => {
    e.preventDefault();
    props.addBookMutation({
      variables: {
        name: values.name,
        genre: values.genre,
        authorId: values.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  const displayAuthors = () => {
    var data = props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };
  return (
    <form id='add-book' onSubmit={submitForm}>
      <div className='field'>
        <label>Book name:</label>
        <input
          type='text'
          name='name'
          value={values.name}
          onChange={handleChange}
        />
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input
          type='text'
          name='genre'
          value={values.genre}
          onChange={handleChange}
        />
      </div>
      <div className='field'>
        <label>Author:</label>
        <select name='authorId' value={values.authorId} onChange={handleChange}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
