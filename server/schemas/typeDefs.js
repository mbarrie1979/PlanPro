const typeDefs = `
  scalar Date
  scalar DateTime
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
    userCount: Int!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    savedSessions: [Session]!
    isAdmin: Boolean!
    getEmailReminders: Boolean!
    getSMSReminders: Boolean!
  }
  type Auth {
    token: ID!
    user: User
  }
 type Query {
    me: User
    user(id: ID!): User
    users: [User]
    conferences: [Conference]
    conference(id: ID!): Conference
    sessions: [Session]  
    sessionsByConference(conferenceId: ID!): [Session]
  }
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveUser(username: String!, email: String!, getEmailReminders: Boolean!, getSMSReminders: Boolean!) : User
    addConference(name: String!, description: String!, startDate: Date!, endDate: Date!, location: String!, image: String!): Conference
    createSession(name: String!, description: String!, date: Date!, time: String!, presenters: [String]!, duration: Int!, room: String!, conferenceId: ID!  ): Session
    saveSession(userId: ID!, sessionId: ID!): User
    removeSession(userId: ID!, sessionId: ID!): User
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
