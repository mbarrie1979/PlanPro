const typeDefs = `
  scalar Date
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
    name: String!
    description: String!
    startDate: Date!
    endDate: Date!
    location: String!
    image: String!
  }
  type Session {
    _id: ID!
    name: String
    description: String!
    presenters: [String]!
    date: Date
    time: String!
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
    addConference(name: String!, description: String!, startDate: Date!, endDate: Date!, location: String!, image: String!): Conference
    createSession(name: String!, description: String!, date: Date!, time: String!, presenters: [String]!, duration: Int!, room: String!, conferenceId: ID!  ): Session
    saveBook(userId: ID!, book: BookInput!): User
    saveSession(userId: ID!, sessionId: ID!): User
    removeSession(userId: ID!, sessionId: ID!): User
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
    name: String
    description: String!
    presenters: [String]!
    date: Date
    duration: Int
    room: String!
    conferenceId: ID!
  }
`;

module.exports = typeDefs;
