import { Navbar, Container, Button } from 'react-bootstrap';
import './CSS/TopNavbar.css';

function TopNavbar() {
  return (
    <main>
      <div className="top-navbar">
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Toggle aria-controls="top-navbar-nav" />
            <Navbar.Collapse id="top-navbar-nav">
              <Navbar.Text>
                <Button variant="outline-primary" href="/add-student">Add Student</Button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </main>
  );
}

export default TopNavbar;
