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
export const SAVE_USER = gql`
  mutation saveUser($username: String!, $email: String!, $getEmailReminders: Boolean!, $getSMSReminders: Boolean!) {
    saveUser(username: $username, email: $email, getEmailReminders: $getEmailReminders, getSMSReminders: $getSMSReminders) {
      username
      email
      getEmailReminders
      getSMSReminders
    }
  }
`;

export const ADD_CONFERENCE = gql`
  mutation addConference($name: String!, $description: String!, $startDate: Date!, $endDate: Date!,
                            $location: String!, $image: String!
  ) {
    addConference(name: $name, description: $description, startDate: $startDate, endDate: $endDate, location: $location, image: $image) 
       {
        _id
        name
        description 
        location
        image
      }
    }
`;

export const CREATE_SESSION = gql`
mutation CreateSession($name: String!, $description: String!, $date: Date!, $time: String !, $presenters: [String]!, $duration: Int!, $room: String!, $conferenceId: ID!) {
  createSession(name: $name, description: $description, date: $date, time: $time,  presenters: $presenters, duration: $duration, room: $room, conferenceId: $conferenceId) {
    conferenceId
    date
    time
    description
    duration
    name
    presenters
    room
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

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      success
      message
      path
    }
  }
`;


