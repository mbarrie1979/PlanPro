import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      isAdmin
      getEmailReminders
      getSMSReminders
      savedSessions {
        _id
        name
        description
        presenters
        date
        time
        duration
        room
        conferenceId
      }
    }
  }
`;

export const GET_CONFERENCES = gql`
query conferences {
  conferences {
    _id
    name
    description 
    startDate
    endDate
    location
    image
  }
}
`;

export const GET_CONFERENCE = gql`
  query conference($id: ID!) {
    conference(id: $id) {
      _id
      name
      description
      startDate
      endDate
      location
      image
    }
  }
`;

export const GET_USER = gql`
query user($id: ID!) {
  user(id: $id) {
    username
    isAdmin
    getSMSReminders
    getEmailReminders
    email
    _id
  }
}
`;



export const GET_SESSIONS_BY_CONFERENCE = gql`
  query getSessionsByConference($conferenceId: ID!) {
    sessionsByConference(conferenceId: $conferenceId) {
      _id
      name
      description
      presenters
      date
      time
      duration
      room
      userCount
      users {
        _id
      }
    }
  }
`;
