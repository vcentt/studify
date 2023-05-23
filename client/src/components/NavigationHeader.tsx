import { Navbar, Nav, Container } from 'react-bootstrap';
import './CSS/NavigationHeader.css';

function NavigationHeader() {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="sidebar-nav">
      <Container>
        <Navbar.Toggle aria-controls="sidebar-nav" />
        <Navbar.Collapse id="sidebar-nav">
          <Nav className="flex-column">
            <div className="nav-section">
              <h4 className="nav-section-title">Overview</h4>
              <Nav.Link href="/" className="nav-link">Overview</Nav.Link>
            </div>
            <div className="nav-section">
              <h4 className="nav-section-title">Subjects</h4>
              <Nav.Link href="/spanish" className="nav-link">Spanish Language</Nav.Link>
              <Nav.Link href="/math" className="nav-link">Mathematics</Nav.Link>
              <Nav.Link href="/social-sciences" className="nav-link">Social Science</Nav.Link>
              <Nav.Link href="/natural-sciences" className="nav-link">Natural Science</Nav.Link>
            </div>
            <div className="nav-section">
              <h4 className="nav-section-title">Assistance</h4>
              <Nav.Link href="assistance" className="nav-link">Assistance</Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationHeader;
