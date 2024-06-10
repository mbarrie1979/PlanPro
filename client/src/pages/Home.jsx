import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_CONFERENCES, GET_ME } from "../utils/queries";
import { formatDate } from "../utils/formatdate";
import AuthModal from "../components/AuthModal";
import Auth from "../utils/auth";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
//this component is accessed currently buy the /home route
const Home = () => {
  const [conferencesData, setConferencesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const {
    loading,
    data,
    error: getConferencesError,
  } = useQuery(GET_CONFERENCES,{fetchPolicy: "no-cache",});
  const {
    loading: loadingUser,
    data: userData,
    error: getUserError,
  } = useQuery(GET_ME, {
    skip: !Auth.loggedIn(), // Only run this query if the user is logged in
  });
  // use this to determine if `useEffect()` hook needs to run again
  const conferencesDataLength = Object.keys(conferencesData).length;

  // console.log("Conference Data:", conferencesData);
  // console.log("Error:" + getConferencesError);
  useEffect(() => {
    if (data && data.conferences) {
      // console.log(data);
      setConferencesData(data.conferences); // Assuming `data.conference` is the array of conferences
    }
  }, [data]);
  const username = userData?.me?.username;
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
      <div className="text-light text-center bg-dark p-5 banner">
        <Row>
          {/* Conditional rendering based on login status */}
          {!Auth.loggedIn() ? (
            <>
              <Col>
                <Container>
                  <h1 className="rock-salt-regular home-title home">
                    Your personalized professional conference planner
                  </h1>
                  <h6 className="rock-salt-regular home sub-head">
                    View upcoming conferences from all over and add or remove
                    your favorite sessions to your conference plan!
                  </h6>
                  <Button
                    className="rock-salt-regular header-button"
                    onClick={() => setShowModal(true)}
                  >
                    <div
                      className="text-center rock-salt-regular"
                      style={{ fontSize: "14px" }}
                    >
                      Get Started!
                    </div>
                  </Button>
                </Container>
              </Col>
              <Col>
                <Container>
                  <div>
                    <img
                      src="/assets/images/op1.png"
                      alt="people"
                      className="banner-image"
                    />
                  </div>
                </Container>
              </Col>
            </>
          ) : (
            <Col>
              <Container>
                <h1
                  className="rock-salt-regular"
                  style={{ fontSize: "3rem", textAlign: "left" }}
                >
                  Welcome, {username}!
                </h1>
              </Container>
            </Col>
          )}
        </Row>
      </div>
      <Container className="main">
        <h2 className="home pt-4 major-mono-display-regular text-light">
          {conferencesData.length
            ? `Viewing ${conferencesData.length} upcoming ${
                conferencesData.length === 1 ? "conference" : "conferences"
              }:`
            : "There are no conferences!"}
        </h2>

        <hr></hr>
        <br></br>
        <Row className="home">
          {conferencesData.map((conference) => {
            return (
              <Col key={conference._id} md="4">
                <Link
                  to={`/conference/${conference._id}`}
                  style={{
                    textDecoration: "none",
                    backgroundImage: `url(${conference.image})`,
                    backgroundSize: "cover",
                  }}
                  className="link-tag"
                >
                  {/* <Card border='dark' className="text-white">  Nardge*/}
                  <Card border="dark" className="card-img text-white">
                    <div className="front">
                      <Card.Img
                        className="img"
                        src={conference.image}
                        alt={conference.name}
                      />
                      <Card.ImgOverlay>
                        <Card.Title className="lg">
                          {conference.name}
                        </Card.Title>
                        <Card.Text>
                          From {formatDate(conference.startDate)} to{" "}
                          {formatDate(conference.endDate)}
                        </Card.Text>
                        <Card.Text className="small">
                          Location: {conference.location}
                        </Card.Text>
                        <Card.Title>{conference.description}</Card.Title>
                      </Card.ImgOverlay>
                    </div>
                  </Card>
                </Link>
                <br />
              </Col>
            );
          })}
        </Row>
      </Container>
      <AuthModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default Home;
