import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

import Auth from "../utils/auth";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  const renderLinks = () => {
    if (Auth.loggedIn()) {
      console.log("User is logged in");
      if (Auth.isAdmin()) {
        console.log("User is logged in and an admin");
        return (
          <>
            <Nav.Link as={Link} to="/mysessions" className="rock-salt-regular">
              <i className="fa-solid fa-database"></i> See Your Sessions
            </Nav.Link>
            <Nav.Link>/</Nav.Link>
            <Nav.Link as={Link} to="/addConference" className="rock-salt-regular">
              <i className="fa-solid fa-database"></i> Add Conference
            </Nav.Link>
            <Nav.Link>/</Nav.Link>
            <Nav.Link as={Link} to="/addSession" className="rock-salt-regular">
              <i className="fa-solid fa-database"></i> Add Session
            </Nav.Link>
            <Nav.Link>/</Nav.Link>
            <Nav.Link onClick={Auth.logout} className="major-mono-display-regular">
              <i className="fa-solid fa-sign-out"></i> Logout
            </Nav.Link>
          </>
        );
      } else {
        return (
          <>
            <Nav.Link as={Link} to="/mysessions" className="rock-salt-regular see-sessions text-dark">
              <i className="fa-solid fa-database"></i> See Your Sessions
            </Nav.Link>
            <Nav.Link>/</Nav.Link>
            <Nav.Link onClick={Auth.logout} className="major-mono-display-regular">
              <i className="fa-solid fa-sign-out"></i> Logout
            </Nav.Link>
          </>
        );
      }
    } else {
      return (
        <Nav.Link onClick={() => setShowModal(true)} className="major-mono-display-regular title">
          <span className="lsLink text-dark">
            {" "}
            <i className="fa-solid fa-user fa-fade"></i> Login/Sign Up
          </span>
        </Nav.Link>
      );
    }
  };

  return (
    <>
      <Navbar bg="light" variant="dark" expand="sm">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="major-mono-display-regular">
            <h1 className="title major-mono-display-regular brand">
              <i className="fa-solid fa-handshake fa-bounce"></i> PlanPro
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar" className="d-flex flex-row-reverse">
            <Nav className="ml-auto d-flex">
              {/* <Nav.Link as={Link} to='/'>
                Search For Books
              </Nav.Link> */}
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  {/* <Nav.Link as={Link} to='/saved'>
                    See Your Books
                  </Nav.Link> */}
                  <Nav.Link
                    as={Link}
                    to="/mysessions"
                    className="rock-salt-regular see-sessions text-dark"
                  >
                    <i className="fa-solid fa-database"></i> See Your Sessions
                  </Nav.Link>
                  <Nav.Link>/</Nav.Link>
                  <Nav.Link
                    onClick={Auth.logout}
                    className="major-mono-display-regular text-dark"
                  >
                    <i className="fa-solid fa-sign-out"></i>Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link
                  onClick={() => setShowModal(true)}
                  className="major-mono-display-regular title"
                >
                  <span className="lsLink text-dark">
                    {" "}
                    <i className="fa-solid fa-user fa-fade"></i>Login/Sign Up
                  </span>
                </Nav.Link>
              )}
              {renderLinks()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)} aria-labelledby="signup-modal">
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login" className="major-mono-display-regular">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
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
    </>
  );
};

export default AppNavbar;
