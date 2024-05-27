// Conference.jsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CONFERENCE, GET_SESSIONS_BY_CONFERENCE } from '../utils/queries';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { formatDate } from '../utils/formatdate';

const Conference = () => {
  const { id } = useParams();
  const { loading: loadingConference, data: conferenceData } = useQuery(GET_CONFERENCE, {
    variables: { id },
  });
  const { loading: loadingSessions, data: sessionData } = useQuery(GET_SESSIONS_BY_CONFERENCE, {
    variables: { conferenceId: id },
  });

  if (loadingConference || loadingSessions) {
    return <h2>LOADING...</h2>;
  }

  if (!conferenceData || !sessionData) {
    return <h2>Error loading data!</h2>;
  }

  const conference = conferenceData.conference;
  const sessions = sessionData.sessionsByConference;

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>{conference.name}</h1>
          <p>{conference.description}</p>
          <p>From {formatDate(conference.startDate)} to {formatDate(conference.endDate)}</p>
          <p className='small'>Location: {conference.location}</p>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>Sessions</h2>
        <Row>
          {sessions.map((session) => (
            <Col key={session._id} md="4">
              <Card border='dark'>
                <Card.Body>
                  <Card.Title>{session.name}</Card.Title>
                  <p>{session.description}</p>
                  <p>Presented by: {session.presenters.join(', ')}</p>
                  <p>On {formatDate(session.date)}</p>
                  <p>Duration: {session.duration} minutes</p>
                  <p>Room: {session.room}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Conference;
