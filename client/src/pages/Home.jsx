import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
// import { useMutation } from '@apollo/client';
import { GET_CONFERENCE } from '../utils/queries';
// import Auth from '../utils/auth';
import {
    Container,
    Card,
    Button,
    Row,
    Col
} from 'react-bootstrap';
//this component is accessed currently buy the /home route
const Home = () => {
    const [conferenceData, setConferenceData] = useState([]);
    const { loading, data, error: getConferenceError } = useQuery(GET_CONFERENCE);
    // use this to determine if `useEffect()` hook needs to run again
    const conferenceDataLength = Object.keys(conferenceData).length;

    useEffect(() => {
        if (data && data.conference) {
            console.log(data);
            setConferenceData(data.conference); // Assuming `data.conference` is the array of conferences
        }
    }, [data]);

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    if (getConferenceError) {
        return <h2>Error loading data!</h2>;
    }



    // if data isn't here yet, say so
    if (!conferenceDataLength) {
        return <h2>LOADING...</h2>;
    }
    return (
        <>
            <div className="text-light bg-dark p-5">
                <Container>
                    <h1>Viewing Upcoming Conferences!</h1>
                </Container>
            </div >
            <Container>
                <h2 className='pt-5'>
                    {conferenceData.length
                        ? `Viewing ${conferenceData.length} upcoming ${conferenceData.length === 1 ? 'conference' : 'conferences'}:`
                        : 'There are no conferences!'}
                </h2>
                <Row>
                    {conferenceData.map((conference) => {
                        return (
                            <Col key={conference._id} md="4">
                                <Card border='dark'>
                                    <Card.Body>
                                        <Card.Title>{conference.name}</Card.Title>
                                        <p className='small'>Location: {conference.location}</p>
                                        <Card.Text>{conference.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>

        </>
    )
}

export default Home;