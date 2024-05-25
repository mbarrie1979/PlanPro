const typeDefs = `
  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]!
    bookCount: Int!
  }
  type Auth {
    token: ID!
    user: User
  }
 type Query {
    me: User
    user(_id: ID!): User
    bookByTitle(title: String!): Book
  }
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(userId: ID!, book: BookInput!): User
    removeBook(userId: ID!, bookId: String!): User
  }
  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }
`;

module.exports = typeDefs;
