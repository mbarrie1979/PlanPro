// Conference.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_CONFERENCE,
  GET_SESSIONS_BY_CONFERENCE,
  GET_ME,
} from "../utils/queries";
import { SAVE_SESSION } from "../utils/mutations";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { formatDate, formatToLocalDate } from "../utils/formatdate";
import { saveSessionIds, getSavedSessionIds } from "../utils/localStorage";
import Auth from "../utils/auth";
import { convertTo12HourFormat } from "../utils/timeConversion";
import "../App.css";

const Conference = () => {
  const { id } = useParams();
  const { loading: loadingConference, data: conferenceData } = useQuery(
    GET_CONFERENCE,
    {
      variables: { id },
    }
  );
  const { loading: loadingSessions, data: sessionData } = useQuery(
    GET_SESSIONS_BY_CONFERENCE,
    {
      variables: { conferenceId: id },
      fetchPolicy: "network-only",
    }
  );
  // Fetch user data including saved sessions
  const { loading: loadingUserData, data: userData } = useQuery(GET_ME);
  const [savedSessionIds, setSavedSessionIds] = useState([]);

  useEffect(() => {
    // Wait until user data is loaded
    if (loadingUserData) return;

    if (userData && Auth.loggedIn()) {
      const savedSessionsFromProfile =
        userData.me.savedSessions.map((session) => session._id) || [];
      const savedSessionsFromLocalStorage = getSavedSessionIds();

      // Merge and remove duplicates
      const combinedSessions = [
        ...new Set([
          ...savedSessionsFromLocalStorage,
          ...savedSessionsFromProfile,
        ]),
      ];
      setSavedSessionIds(combinedSessions);
      saveSessionIds(combinedSessions); // Update local storage with combined data
    } else {
      const savedSessionsFromLocalStorage = getSavedSessionIds();
      setSavedSessionIds(savedSessionsFromLocalStorage);
    }
  }, [loadingUserData, userData]);

  useEffect(() => {
    saveSessionIds(savedSessionIds);
    // console.log(savedSessionIds)
  }, [savedSessionIds]);

  const [saveSession] = useMutation(SAVE_SESSION, {
    refetchQueries: [
      { query: GET_SESSIONS_BY_CONFERENCE, variables: { conferenceId: id } },
    ],
  });

  const handleSaveSession = async (sessionId) => {
    // console.log('Session ID:', sessionId)
    try {
      const userId = Auth.getProfile().data._id;
      // console.log('User ID:', userId);
      const { data } = await saveSession({
        variables: { userId, sessionId },
      });

      if (data) {
        setSavedSessionIds((prevIds) => {
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
    return (
      <h2>
        Error loading data!{" "}
        <i className="fa-solid fa-spinner fa-spin-pulse"></i>
      </h2>
    );
  }

  const conference = conferenceData.conference;
  const sessions = sessionData.sessionsByConference;
  console.log(sessions);

  const styles = {
    backgroundImage: `url(${conference.image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    top: "1",
    left: "0",
    zIndex: "1",
  };

  return (
    <>
      <div
        className=" img2 conference-container text-light bg-black bg-opacity-75 d-flex justify-content-center"
        style={styles}
      >
        <Container
        // className="conference-container"
        // style={{
        //   backgroundImage: `url(${conference.image})`,
        // }}
        >
          <span>
            <a
              href="/"
              className="text-decoration-none"
              title="back to Homepage"
            >
              <h5
                style={{
                  letterSpacing: "3px",
                  textAlign: "right",
                  lineHeight: "50px",
                  textShadow: "1px 2px 3px black,0px 0px 5px white",
                }}
                className="major-mono-display-regular homeLink mt-4"
              >
                <i className="fa-solid fa-hand-point-left"> Go back home !</i>
              </h5>
            </a>
          </span>

          <div
            className="conferenceBox"
            style={{
              textShadow: "1px 2px 3px black, 0px 0px 10px white",
              backgroundColor: "rgba(0, 0, 0, 0.552)",
              padding: "20px",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            <h1
              className="major-mono-display-regular"
              style={{
                fontWeight: "600",
                fontSize: "50px",
                borderBottom: "double",
                width: "60%",
                textShadow: "1px 2px 3px black, 0px 0px 10px white",
                color: "white",
              }}
            >
              {conference.name}
            </h1>
            <p>{conference.description}</p>
            <p>
              From {formatDate(conference.startDate)} to{" "}
              {formatDate(conference.endDate)}
            </p>
            <p className="small">Location: {conference.location}</p>
          </div>
        </Container>
      </div>
      <div className="line"></div>
      <div className="img">
        <Container>
          <h2
            className="pt-5 major-mono-display-regular text-white"
            style={{ fontSize: "2.3rem", fontWeight: "600" }}
          >
            <i className="fa-solid fa-check-double"></i>
            Sessions:
          </h2>
          <Row className="con-box">
            {sessions.map((session) => (
              <Col key={session._id} md="4">
                <div className="c">
                  <Card.Body className="cardBody">
                    <div className="card-com">
                      <Card.Title style={{ fontWeight: "bold" }}>
                        <h1 className="ses-name text-dark">{session.name}</h1>
                      </Card.Title>
                      <p>summary: {session.description}</p>
                      <p>Presented by: {session.presenters.join(", ")}</p>
                      <p>On {formatToLocalDate(session.date)}</p>
                      <p>Time {convertTo12HourFormat(session.time)}</p>
                      <p>Duration: {session.duration} minutes</p>
                      <p>Room: {session.room}</p>
                      <p>Users attending: {session.userCount}</p>
                      {Auth.loggedIn() && (
                        <Button
                          disabled={savedSessionIds?.some(
                            (savedSessionId) => savedSessionId === session._id
                          )}
                          className="btn btn-dark button "
                          onClick={() => handleSaveSession(session._id)}
                        >
                          {savedSessionIds?.some(
                            (savedSessionId) => savedSessionId === session._id
                          ) ? (
                            <span>
                              This session has already been saved!{" "}
                              <i
                                className="fa-solid fa-check-circle"
                                style={{
                                  color: "green",
                                  borderRadius: "10px",
                                  backgroundColor: "black",
                                  fontSize: "18px",
                                }}
                              ></i>
                            </span>
                          ) : (
                            <span>
                              <i className="fa-solid fa-save"></i> Save this
                              session!
                            </span>
                          )}
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Conference;
