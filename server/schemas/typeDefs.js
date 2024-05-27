const typeDefs = `
  scalar DateTime
  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }
  type Conference {
    _id: ID!
    name: String
    description: String!
    startDate: DateTime
    endDate: DateTime
    location: String!
  }
  type Session {
    _id: ID!
    name: String
    description: String!
    presenters: [String]!
    date: DateTime
    duration: Int
    room: String!
    users: [User]
    conferenceId: ID!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]!
    savedSessions: [Session]!
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
    conferences: [Conference]
    conference(id: ID!): Conference
    sessions: [Session]  
    sessionsByConference(conferenceId: ID!): [Session]
  }
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(userId: ID!, book: BookInput!): User
    saveSession(userId: ID!, sessionId: ID!): User
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
  input SessionInput {
    _id: ID!
    name: String
    description: String!
    presenters: [String]!
    date: DateTime
    duration: Int
    room: String!
    conferenceId: ID!
  }
`;

module.exports = typeDefs;
