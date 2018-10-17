import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Context } from '../../context/Context';

class SignUp extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    }
  };

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.id]: e.target.value }
    });
  };

  render() {
    return (
      <Context.Consumer>
        {value => (
          <Form onSubmit={e => value.methods.register(e, this.state.data)}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                onChange={this.onChange}
                type="email"
                name="email"
                id="email"
                placeholder="with a placeholder"
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                onChange={this.onChange}
                type="password"
                name="password"
                id="password"
                placeholder="password placeholder"
              />
            </FormGroup>
            <Button>Registrera</Button>
          </Form>
        )}
      </Context.Consumer>
    );
  }
}

export default SignUp;
