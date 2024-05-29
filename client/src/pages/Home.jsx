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

    console.log("Conference Data:" + conferencesData);
    console.log("Error:" + getConferencesError);
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
                                        <Card.Img className='img' src={conference.image} alt={conference.name} />
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