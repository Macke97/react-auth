import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Context } from '../../context/Context';

class Login extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    }
  };

  render() {
    return (
      <Context.Consumer>
        {value => (
          <Form onSubmit={e => value.methods.login(e, this.state)}>
            <FormGroup>
              <Label for="loginEmail">Email</Label>
              <Input
                type="email"
                name="loginEmail"
                id="loginEmail"
                placeholder="with a placeholder"
                onChange={e =>
                  this.setState({ data: { ...this.state.data, email: e.target.value } })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="loginPassword">Password</Label>
              <Input
                type="password"
                name="loginPassword"
                id="loginPassword"
                placeholder="password placeholder"
                onChange={e =>
                  this.setState({ data: { ...this.state.data, password: e.target.value } })
                }
              />
            </FormGroup>
            <Button>Logga in</Button>
          </Form>
        )}
      </Context.Consumer>
    );
  }
}

export default Login;
