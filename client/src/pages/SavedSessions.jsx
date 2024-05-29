import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { GET_ME, GET_CONFERENCE } from '../utils/queries';
import { REMOVE_SESSION } from '../utils/mutations';
import Auth from '../utils/auth';
import { formatDate } from '../utils/formatdate';
import { removeSessionId } from '../utils/localStorage';

const SavedSessions = () => {
  const [userData, setUserData] = useState({});
  const [conferenceNames, setConferenceNames] = useState({});
  const [sessionsByConference, setSessionsByConference] = useState({});
  const { loading, data, error: getMeError } = useQuery(GET_ME);
  const [removeSession, { error: removeSessionError }] = useMutation(REMOVE_SESSION);
  // to get conference name
  const [getConference, { data: conferenceData }] = useLazyQuery(GET_CONFERENCE);
  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    if (data) {
      setUserData(data.me);
      // Fetch conference names for saved sessions
      data.me.savedSessions.forEach(session => {
        if (session.conferenceId && !conferenceNames[session.conferenceId]) {
          getConference({ variables: { id: session.conferenceId } });
        }
      });

      // Group sessions by conference
      const groupedSessions = data.me.savedSessions.reduce((acc, session) => {
        if (session.conferenceId) {
          if (!acc[session.conferenceId]) {
            acc[session.conferenceId] = [];
          }
          acc[session.conferenceId].push(session);
        }
        return acc;
      }, {});

      setSessionsByConference(groupedSessions);
    }
  }, [data, getConference, conferenceNames]);

  useEffect(() => {
    if (conferenceData && conferenceData.conference) {
      setConferenceNames(prevNames => ({
        ...prevNames,
        [conferenceData.conference._id]: conferenceData.conference.name,
      }));
    }
  }, [conferenceData]);


  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteSession = async (sessionId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeSession({
        variables: { userId: userData._id, sessionId: sessionId },
      });

      if (!data) {
        throw new Error('Something went wrong!');
      }

      const updatedUser = data.removeSession;
      setUserData(updatedUser);
      removeSessionId(sessionId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (getMeError) {
    return <h2>Error loading data!</h2>;
  }



  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }
  // console.log(userData);
  return (
    <>
    <div className="text-light bg-dark p-5">
      <Container>
        <h1>Viewing saved sessions!</h1>
      </Container>
    </div>
    <Container>
      <h2 className='pt-5'>
        {userData.savedSessions.length
          ? `Viewing ${userData.savedSessions.length} saved ${userData.savedSessions.length === 1 ? 'session' : 'sessions'}:`
          : 'You have no saved sessions!'}
      </h2>
      {Object.keys(sessionsByConference).map(conferenceId => (
        <div key={conferenceId} className='mb-4'>
          <h3>{conferenceNames[conferenceId] || 'Loading...'}</h3>
          <Row>
            {sessionsByConference[conferenceId].map((session) => (
              <Col key={session._id} md="4">
                <Card border='dark'>
                  <Card.Body>
                    <Card.Title>{session.name}</Card.Title>
                    <p className='small'>Presenters: {session.presenters.join(', ')}</p>
                    <p className='small'>Date: {formatDate(session.date)}</p>
                    <p className='small'>Duration: {session.duration} minutes</p>
                    <p className='small'>Room: {session.room}</p>
                    <Card.Text>{session.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteSession(session._id)}>
                      Delete this Session!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  </>
  );
};

export default SavedSessions;
