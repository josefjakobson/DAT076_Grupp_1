import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import creditModal from "./creditModal";
import useModal from '../hooks/useModal';
import Modal from './creditModal';


export default function TheNavbar({ open }: { open: () => void } ) {

    return (
      <>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/games">GambIT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/games">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/Scoreboard">ScoreBoard</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button variant="outline-dark" onClick={open}>Credits</Button>
    </Container>
    </Navbar>
      </>
    )

  }


  