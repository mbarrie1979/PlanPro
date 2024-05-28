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
            <div className="text-light text-center bg-dark p-5">
                <Container>
                    <h1>View Upcoming Conferences</h1>
                </Container>
            </div >
            <Container>
                <h2 className='pt-4'>
                    {conferencesData.length
                        ? `Viewing ${conferencesData.length} upcoming ${conferencesData.length === 1 ? 'conference' : 'conferences'}:`
                        : 'There are no conferences!'}
                </h2>
                
                <hr></hr>
                <br></br>
                <Row>
                    {conferencesData.map((conference) => {
                        return (
                            <Col key={conference._id} md="4">
                                <Link to={`/conference/${conference._id}`} style={{ textDecoration: 'none' }}>
                                    {/* <Card border='dark' className="text-white">  Nardge*/}
                                    <Card border='dark' className="text-white card-link">
                                        <Card.Img className='img' src="data:image/jpeg;base64,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" alt={conference.name} />
                                        <Card.ImgOverlay>
                                            <Card.Title className="lg">{conference.name}</Card.Title>
                                            <Card.Text>From {formatDate(conference.startDate)} to {formatDate(conference.endDate)}</Card.Text>
                                            <Card.Text className='small'>Location: {conference.location}</Card.Text>
                                            <Card.Title>{conference.description}</Card.Title>
                                        </Card.ImgOverlay>
                                    </Card>
                                </Link>
                                <br />
                            </Col>
                        );
                    })}
                </Row>
            </Container>

        </>
    )
}

export default Home;