# **Tiny Library**

_Simple fullstack web application where you can search for and add/remove books to a fictitious library._

---

run `npm install` and `npm start` in both [/server](server) and [/client](client) to run the website.

---

The main goal of this application was to practice the use of TypeScript, GraphQL and React. The server is running a GraphQL API through Apollo-Server, which our React-app on the client side then calls to fetch (or mutate) the necessary data. In this case: books and authors!

We used the npm package [fakebase](https://www.npmjs.com/package/fakebase) to simulate a DB with json-files. It is very simple to set up and allowed us to persist data for this small project, without much hassle.

We spent quite some time to figure out our how to implement our `addBook` mutation resolver in [resolver.ts](server/src/resolvers.ts). We could not only check if the book title and author merely existed in our library. We also had to make sure that the author of the book we had didn't already have a book by that name associated with it.

The frontend is a very simple React-app with one big scss-file for styling.

### **SERVER:**

    Made with:
    - GraphQL
    - TypeScript
    - Apollo Server
    - Fakebase

### **CLIENT:**

    Made with:
    - Vite
    - React
    - TypeScript
    - React Router
    - Apollo Client
    - GraphQL
    - Sass

### **Made by:**

[Simon](https://github.com/simon-off) & [Per](https://github.com/P-Ahlinder/)
