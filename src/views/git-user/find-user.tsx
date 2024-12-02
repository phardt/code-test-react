import { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import './css/find-user-style.css';

function FindUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');

  function handleSearchUser() {
    navigate(`/profile-detail/${user}`);
  }

  return (
    <Container fluid className="d-flex align-items-center justify-content-center find-user-layout-min-height ">
      <Row>
        <Col>
          <Row>
            <Col className="d-flex justify-content-center">
              <i className="bi bi-github h1" ></i>
            </Col>
          </Row>
          <Row >
            <Col className="d-flex justify-content-center">
              <h6>
                Search user from Github
              </h6>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <FloatingLabel controlId="floatingInput" label="User name" className="mb-3">
                <Form.Control type="text" onChange={event => setUser(event.target.value)} placeholder="" />
              </FloatingLabel>
            </Col>
          </Row>
          <Row >
            <Col className="d-flex justify-content-center">
              <Button className="w-100" onClick={handleSearchUser}> Search User</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default FindUser
