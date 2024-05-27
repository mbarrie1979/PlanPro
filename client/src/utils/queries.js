import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
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

export const GET_CONFERENCE = gql`
query conference {
  conference {
    _id
    name
    description 
    startDate
    endDate
    location
  }
}`