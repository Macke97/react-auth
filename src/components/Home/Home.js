import React from 'react';
import { Row, Col } from 'reactstrap';
import SignUp from '../Forms/SignUp';
import Login from '../Forms/Login';
import { Context } from '../../context/Context';
const Home = props => (
  <Context.Consumer>
    {value => (
      <>
        <Row>
          <Col xs={12}>
            <h1 className="text-center">Välkommen!</h1>
            {value.data.isAuthenticated ? <p>{value.data.user.email}</p> : <p>Inte inloggad</p>}
          </Col>
        </Row>
        {!value.data.isAuthenticated && (
          <Row>
            <Col lg={6}>
              <h2>Registrera</h2>
              <SignUp />
            </Col>
            <Col lg={6}>
              <h2>Logga in</h2>
              <Login />
            </Col>
          </Row>
        )}
      </>
    )}
  </Context.Consumer>
);

export default Home;
