import { Container, Nav, Navbar } from 'react-bootstrap'
import { AppRoutes } from './routes/app-routes';

function App() {

  return (
    <div className='bg-light'>
      <Navbar sticky="top" expand="lg" className='navbar-dark bg-dark'>
        <Container fluid>
          <Navbar.Brand >Phyllip Code Test</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id='layout-nav-bar'>
            <Nav className='me-auto'>
              <Nav.Link href="/">Find User</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AppRoutes />
    </div>
  )
}

export default App
