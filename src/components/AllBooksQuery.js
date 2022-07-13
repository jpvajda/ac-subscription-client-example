import { gql, useQuery } from "@apollo/client";
import React from "react";

const GET_BOOKS = gql`
  query Query {
    books {
      title
      author
      id
      available
    }
  }
`;

function AllBooksQuery({ onBookSelected }) {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return "Loading Book Selector...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <select name="book" onChange={() => onBookSelected}>
        {data.books.map((book) => (
          <option key={book.id} value={book.title}>
            {book.title}
          </option>
        ))}
      </select>
      <p>@todo return book data here</p>
    </div>
  );
}

export default AllBooksQuery;
