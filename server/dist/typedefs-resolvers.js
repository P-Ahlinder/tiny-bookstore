import data from "./data.js";
// console.log(data);
const typeDefs = `#graphql
  type Book {
    id: ID
    title: String
    author: String
  }

  type Author {
    name: String
    books: [Book]
  }

  # Special kind of type
  type Query {
    books: [Book]
    book(id: ID): Book
    authors: [Author]
  }
`;
const resolvers = {
    Query: {
        books: () => data.booksArray,
        book: (parent, args, context) => {
            return data.booksArray.find((book) => book.id === args.id);
        },
        authors: () => data.authorsArray,
    },
    Author: {
        books: (parent) => data.booksArray.filter((book) => book.author === parent.name),
    },
};
export { typeDefs, resolvers };
