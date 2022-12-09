import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { Book } from "../types";

type Props = {
  book: Book;
};

const REMOVE_BOOK = gql`
  mutation removeBook($removeBookId: ID) {
    removeBook(id: $removeBookId) {
      id
      title
    }
  }
`;

function BookListItem({ book }: Props) {
  const [removeBook, { data, loading, error }] = useMutation(REMOVE_BOOK);

  // TODO: Add logic to remove book!
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(book.title);
  };

  return (
    <article>
      <Link to={`/book/${book.id}`}>
        <h2>{book.title}</h2>
      </Link>
      <Link to={`/author/${book.author.id}`}>
        <p>{book.author.name}</p>
      </Link>
      <button onClick={handleRemove}>Remove</button>
    </article>
  );
}

export default BookListItem;
