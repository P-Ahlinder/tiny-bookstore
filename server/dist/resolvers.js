import { Database } from "fakebase";
const db = new Database("./data/");
const booksTable = db.table("books");
const authorsTable = db.table("authors");
const resolvers = {
    Mutation: {
        saveBook: async (_, args) => {
            const existingBooks = await booksTable.findAll((book) => {
                return book.title.toLowerCase() === args.title.toLowerCase();
            });
            const existingAuthor = await authorsTable.findOne((author) => {
                return author.name.toLowerCase() === args.authorName.toLowerCase();
            });
            if (existingBooks && existingAuthor) {
                const sameBook = existingBooks.find((book) => book.authorId === existingAuthor.id);
                if (sameBook) {
                    return sameBook;
                }
            }
            let authorIdString = "";
            if (existingAuthor) {
                authorIdString = existingAuthor.id;
            }
            else {
                const newAuthor = await authorsTable.create({ name: args.authorName });
                authorIdString = newAuthor.id;
            }
            return await booksTable.create({
                title: args.title,
                year: args.year,
                authorId: authorIdString,
            });
        },
        deleteBookById: async (_, args) => await booksTable.delete(args.id),
    },
    Query: {
        books: async () => await booksTable.findAll(),
        booksByTitle: async (_, args) => {
            return await booksTable.findAll((book) => {
                return book.title.toLowerCase().includes(args.title.toLowerCase());
            });
        },
        authors: async () => await authorsTable.findAll(),
        authorsByName: async (_, args) => {
            return await authorsTable.findAll((author) => {
                return author.name.toLowerCase().includes(args.name.toLowerCase());
            });
        },
    },
    Book: {
        author: async (parent) => await authorsTable.findById(parent.authorId),
    },
    Author: {
        books: async (parent) => await booksTable.findAll((book) => book.authorId === parent.id),
    },
};
export default resolvers;
