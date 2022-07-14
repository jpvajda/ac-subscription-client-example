import { gql, useQuery } from "@apollo/client";
import React, { useState, useMemo } from "react";

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

function AllBooksQuery() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [info, setInfo] = useState(null);
  const selectedBook = useMemo(
    () => data?.books?.find((book) => book.id === info),
    [data?.books, info]
  );

  console.log(info, selectedBook);

  if (loading) return "Loading Book Selector...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <select
        name="book"
        onChange={(e) => {
          setInfo(e.target.value);
          console.log(e.target.value);
        }}
      >
        {data.books.map((book) => (
          <option key={book.id} value={book.id}>
            {book.title}
          </option>
        ))}
      </select>
      <p>{selectedBook?.title}</p>
      <p>{selectedBook?.id}</p>
      <p>{selectedBook?.author}</p>
      <p>{`${selectedBook?.available}`}</p>
    </div>
  );
}

export default AllBooksQuery;
