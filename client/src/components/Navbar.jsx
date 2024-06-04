import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
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
              <h6 className="trade-winds-regular">
                <i className="fa-solid fa-database"></i> See your sessions
              </h6>
            </Nav.Link>
            <Nav.Link>/</Nav.Link>
            <Nav.Link
              as={Link}
              to="/addConference"
              className="rock-salt-regular"
            >
              <i className="fa-solid fa-database"></i> Add Conference
            </Nav.Link>
            <Nav.Link>/</Nav.Link>
            <Nav.Link as={Link} to="/addSession" className="rock-salt-regular">
              <i className="fa-solid fa-database"></i> Add Session
            </Nav.Link>
            <Nav.Link>/</Nav.Link>
            <Nav.Link
              onClick={Auth.logout}
              className="trade-winds-regular "
              style={{ fontWeight: "bold" }}
            >
              <h6 className="trade-winds-regular">
                <i className="fa-solid fa-sign-out"></i> Logout
              </h6>
            </Nav.Link>
          </>
        );
      } else
        return (
          <>
            <Nav.Link as={Link} to="/mysessions">
              <h6 className="rock-salt-regular text-black hover">
                <i className="fa-solid fa-database"></i> See your sessions
              </h6>
            </Nav.Link>
            <Nav.Link className="text-black">/</Nav.Link>
            <Nav.Link onClick={Auth.logout} style={{ fontWeight: "bold" }}>
              <h6 className="major-mono-display-regular hover text-black">
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
            <h1 className="title major-mono-display-regular">
              <i className="fa-solid fa-handshake "></i> PlanPro
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
                    <h3
                      className=" shrikhand-regular
                        icon"
                      style={{
                        textShadow: "1px 2px 3px black",
                      }}
                    >
                      LOGIN
                    </h3>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="linkItem">
                  <Nav.Link eventKey="signup">
                    <h3
                      className="shrikhand-regular icon"
                      style={{
                        textShadow: "1px 2px 3px black",
                      }}
                    >
                      SIGNUP
                    </h3>
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
    </>
  );
};

export default AppNavbar;
