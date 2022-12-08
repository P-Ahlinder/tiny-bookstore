const typeDefs = `#graphql
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    birth_year: Int
    books: [Book]
  }

  # Special kind of type
  type Query {
    books: [Book]
    booksByTitle(title: String): [Book]
    authors: [Author]
    authorsByName(name: String): [Author]
  }
  
  type Mutation {
    saveBook(title: String, year: Int, authorName: String): Book
    deleteBookById(id: ID): Book
  }
`;

export default typeDefs;
