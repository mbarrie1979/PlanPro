import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_CONFERENCES } from '../utils/queries';
import { formatDate } from '../utils/formatdate';
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
    const [conferencesData, setConferencesData] = useState([]);
    const { loading, data, error: getConferencesError } = useQuery(GET_CONFERENCES);
    // use this to determine if `useEffect()` hook needs to run again
    const conferencesDataLength = Object.keys(conferencesData).length;

    useEffect(() => {
        if (data && data.conferences) {
            console.log(data);
            setConferencesData(data.conferences); // Assuming `data.conference` is the array of conferences
        }
    }, [data]);

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    if (getConferencesError) {
        return <h2>Error loading data!</h2>;
    }



    // if data isn't here yet, say so
    if (!conferencesDataLength) {
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
                    {conferencesData.length
                        ? `Viewing ${conferencesData.length} upcoming ${conferencesData.length === 1 ? 'conference' : 'conferences'}:`
                        : 'There are no conferences!'}
                </h2>
                <Row>
                    {conferencesData.map((conference) => {
                        return (
                            <Col key={conference._id} md="4">
                                <Link to={`/conference/${conference._id}`} style={{ textDecoration: 'none' }}>
                                    <Card border='dark'>
                                        <Card.Body>
                                            <Card.Title>{conference.name}</Card.Title>
                                            <p>From {formatDate(conference.startDate)} to {formatDate(conference.endDate)}</p>
                                            <p className='small'>Location: {conference.location}</p>
                                            <Card.Text>{conference.description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        );
                    })}
                </Row>
            </Container>

        </>
    )
}

export default Home;