// Conference.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONFERENCE, GET_SESSIONS_BY_CONFERENCE, GET_ME } from '../utils/queries';
import { SAVE_SESSION } from '../utils/mutations';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { formatDate } from '../utils/formatdate';
import { saveSessionIds, getSavedSessionIds } from '../utils/localStorage';
import Auth from '../utils/auth';

const Conference = () => {
    const { id } = useParams();
    const { loading: loadingConference, data: conferenceData } = useQuery(GET_CONFERENCE, {
        variables: { id },
    });
    const { loading: loadingSessions, data: sessionData } = useQuery(GET_SESSIONS_BY_CONFERENCE, {
        variables: { conferenceId: id },
    });
// Fetch user data including saved sessions
const { loading: loadingUserData, data: userData } = useQuery(GET_ME);
    const [savedSessionIds, setSavedSessionIds] = useState([]);


    useEffect(() => {
        // Wait until user data is loaded
        if (loadingUserData) return;

        if (userData && Auth.loggedIn()) {
            const savedSessionsFromProfile = userData.me.savedSessions.map(session => session._id) || [];
            const savedSessionsFromLocalStorage = getSavedSessionIds();

            // Merge and remove duplicates
            const combinedSessions = [...new Set([...savedSessionsFromLocalStorage, ...savedSessionsFromProfile])];
            setSavedSessionIds(combinedSessions);
            saveSessionIds(combinedSessions); // Update local storage with combined data
        } else {
            const savedSessionsFromLocalStorage = getSavedSessionIds();
            setSavedSessionIds(savedSessionsFromLocalStorage);
        }
    }, [loadingUserData, userData]);

    useEffect(() => {
        saveSessionIds(savedSessionIds);
        console.log(savedSessionIds)
    }, [savedSessionIds]);

    const [saveSession] = useMutation(SAVE_SESSION);

    const handleSaveSession = async (sessionId) => {
        // console.log('Session ID:', sessionId)
        try {
            const userId = Auth.getProfile().data._id;
            console.log('User ID:', userId);
            const { data } = await saveSession({
                variables: { userId, sessionId },
            });

            if (data) {
                setSavedSessionIds(prevIds => {
                    const newIds = [...prevIds, sessionId];
                    saveSessionIds(newIds);
                    return newIds;
                });
            }
        } catch (e) {
            console.error(e);
        }
    };



    if (loadingConference || loadingSessions) {
        return <h2>LOADING...</h2>;
    }

    if (!conferenceData || !sessionData) {
        return <h2>Error loading data!</h2>;
    }

    const conference = conferenceData.conference;
    const sessions = sessionData.sessionsByConference;
    // console.log(sessionData)

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
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={savedSessionIds?.some((savedSessionId) => savedSessionId === session)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveSession(session._id)}>
                                            {savedSessionIds?.some((savedSessionId) => savedSessionId === session._id)
                                                ? 'This session has already been saved!'
                                                : 'Save this Session!'}
                                        </Button>
                                    )}
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
