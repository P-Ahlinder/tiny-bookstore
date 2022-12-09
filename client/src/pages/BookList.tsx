import { useQuery, gql, useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../types";

const GET_BOOKS = gql`
  query Query {
    books {
      id
      title
      year
      author {
        id
        name
      }
    }
  }
`;

const REMOVE_BOOK = gql`
  mutation removeBook($removeBookId: ID) {
    removeBook(id: $removeBookId) {
      id
      title
    }
  }
`;

function Books() {
  // const [removeBook, { data, loading, error }] = useMutation(REMOVE_BOOK);
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   setFilteredBooks(data.books);
  // }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchResult = data.books.filter((book: Book) => {
      return (
        book.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        book.author.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setFilteredBooks(searchResult);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const getBooksArray = () => {
    if (searchInputRef.current != null && searchInputRef.current.value.length > 1) {
      return filteredBooks;
    }
    return data.books;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // setFilteredBooks([...data.books]);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search: </label>
        <input
          onChange={handleSearch}
          ref={searchInputRef}
          id="search"
          type="text"
          autoComplete="off"
        />
      </form>
      <h1>Books: </h1>
      {getBooksArray().map((book: Book) => (
        <article>
          <Link to={`/book/${book.id}`} key={book.id}>
            <h2>{book.title}</h2>
          </Link>
          <Link to={`/author/${book.author.id}`} key={"author" + book.id}>
            <p>{book.author.name}</p>
          </Link>
          <button>Remove</button>
        </article>
      ))}
    </div>
  );
}

export default Books;
