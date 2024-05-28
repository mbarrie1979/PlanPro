import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_SESSION } from '../utils/mutations';
import Auth from '../utils/auth';
import { formatDate } from '../utils/formatdate';
import { removeSessionId } from '../utils/localStorage';

const SavedSessions = () => {
  const [userData, setUserData] = useState({});
  const { loading, data, error: getMeError } = useQuery(GET_ME);
  const [removeSession, { error: removeSessionError }] = useMutation(REMOVE_SESSION);
  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    if (data) {
      console.log(data.me)
      setUserData(data.me);

    }
  }, [data]);



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
        <Row>
          {userData.savedSessions.map((session) => {
            return (
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
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedSessions;
