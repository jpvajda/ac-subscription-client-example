import { useSubscription, gql } from "@apollo/client";
import React from "react";

const SUBSCRIBE_BOOK_ADDED = gql`
  subscription Subscription {
    newBook {
      title
      author
      id
      available
    }
  }
`;

const NewBookNotification = () => {
  const { data, error, loading } = useSubscription(SUBSCRIBE_BOOK_ADDED);

  // TODO get subscription update to render
  if (loading) {
    return <div>Loading Subscription Data...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="notification">
      <h2>New Book!</h2>
      <p>
        TITLE: <strong> {!loading && data.newBook.title} </strong>
      </p>
      <p>
        AUTHOR: <strong> {!loading && data.newBook.author} </strong>
      </p>
      <p>
        ID: <strong> {!loading && data.newBook.id} </strong>
      </p>
      <p>
        AVAILABLE: <strong> {!loading && `${data.newBook.available}`} </strong>
      </p>
    </div>
  );
};

export default NewBookNotification;
