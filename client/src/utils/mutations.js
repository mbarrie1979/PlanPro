import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password){
        token
        user {
        _id
        username
        email
        }
    }
}
`

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $book: BookInput!) {
    saveBook(userId: $userId, book: $book) {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
      bookCount
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($userId: ID!, $bookId: String!) {
    removeBook(userId: $userId, bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
      bookCount
    }
  }
`;

export const SAVE_SESSION = gql`
  mutation saveSession($userId: ID!, $sessionId: ID!) {
    saveSession(userId: $userId, sessionId: $sessionId) {
      _id
      savedSessions {
        _id
        name
        description
        presenters
        date
        duration
        room
      }
    }
  }
`;
export const REMOVE_SESSION = gql`
  mutation removeSession($userId: ID!, $sessionId: ID!) {
    removeSession(userId: $userId, sessionId: $sessionId) {
      _id
      savedSessions {
        _id
        name
        description
        presenters
        date
        duration
        room
      }
    }
  }
`;


