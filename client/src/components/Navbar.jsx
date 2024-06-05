import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import AuthModal from "./AuthModal";
import Auth from "../utils/auth";

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  // set modal display state
  function renderLinks() {
    if (Auth.loggedIn()) {
      console.log("User is logged in");
      if (Auth.isAdmin()) {
        console.log("User is logged in and an admin");
        return (
          <>
            <Nav.Link as={Link} to="/mysessions">
              <h6
                className="rock-salt-regular text-black"
                style={{ animation: "title 0.5s ease-in-out" }}
              >
                <i className="fa-solid fa-database"></i> See your sessions
              </h6>
            </Nav.Link>
            <Nav.Link className="text-black">/</Nav.Link>
            <Nav.Link
              as={Link}
              to="/addConference"
              className="rock-salt-regular text-black"
              style={{ animation: "title 0.5s ease-in-out" }}
            >
              <i
                className="fa-solid fa-circle-plus"
                style={{ fontSize: "12px" }}
              ></i>{" "}
              Add Conference
            </Nav.Link>
            <Nav.Link className="text-black">/</Nav.Link>
            <Nav.Link
              as={Link}
              to="/addSession"
              className="rock-salt-regular text-black"
              style={{ animation: "title 0.5s ease-in-out" }}
            >
              <i
                className="fa-solid fa-circle-plus"
                style={{ fontSize: "12px" }}
              ></i>{" "}
              Add Session
            </Nav.Link>
            <Nav.Link className="text-black">/</Nav.Link>
            <Nav.Link onClick={Auth.logout} style={{ fontWeight: "bold" }}>
              <h6
                className="rock-salt-regular title text-black"
                style={{ fontSize: "20px" }}
              >
                <i className="fa-solid fa-sign-out"></i> Logout
              </h6>
            </Nav.Link>
          </>
        );
      } else
        return (
          <>
            <Nav.Link as={Link} to="/mysessions">
              <h6
                className="rock-salt-regular text-black hover"
                style={{ fontWeight: "bold", fontSize: "16px" }}
              >
                <i className="fa-solid fa-database"></i> See your sessions
              </h6>
            </Nav.Link>
            <Nav.Link className="text-black">/</Nav.Link>
            <Nav.Link as={Link} to="/profile">
              <h6
                className="rock-salt-regular text-black hover title"
                style={{ fontWeight: "bold", fontSize: "16px" }}
              >
                <i className="fa-solid fa-database"></i> Profile
              </h6>
            </Nav.Link>
            <Nav.Link className="text-black">/</Nav.Link>
            <Nav.Link onClick={Auth.logout} style={{ fontWeight: "bold" }}>
              <h6
                className="rock-salt-regular hover text-black "
                style={{ fontWeight: "bold", fontSize: "16px" }}
              >
                <i className="fa-solid fa-sign-out"></i> Logout
              </h6>
            </Nav.Link>
          </>
        );
    } else {
      return (
        <Nav.Link onClick={() => setShowModal(true)}>
          <h4
            className="major-mono-display-regular text-black title"
            style={{ fontSize: "20px" }}
          >
            <i className="fa-solid fa-user"></i> Login/Signup
          </h4>
        </Nav.Link>
      );
    }
  }
  return (
    <>
      <Navbar bg="light" variant="dark" expand="sm">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <h1 className="title major-mono-display-regular text-dark">
              <i
                className="fa-solid fa-handshake"
                style={{
                  backgroundImage: "linear-gradient(to right,black,lightgrey )",
                  color: "transparent",
                  backgroundClip: "text",
                }}
              ></i>
              PlanPro
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar" className="d-flex flex-row-reverse">
            <Nav className="ml-auto d-flex">
              {/* <Nav.Link as={Link} to='/'>
                Search For Books
              </Nav.Link> */}
              {/* if user is logged in show saved books and logout */}
              {renderLinks()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {
        <Modal
          size="lg"
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="signup-modal"
        >
          <Tab.Container defaultActiveKey="login">
            <Modal.Header closeButton>
              <Modal.Title id="signup-modal">
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="login" className=" linkItem ">
                      <span className="icon">Login</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="linkItem">
                    <Nav.Link eventKey="signup">
                      <span className="icon">Signup</span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <Tab.Pane eventKey="login">
                  <LoginForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey="signup">
                  <SignUpForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
      }
    </>
  );
};

export default AppNavbar;
