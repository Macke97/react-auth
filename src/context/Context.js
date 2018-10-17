import React from 'react';
import { withRouter } from 'react-router-dom';

export const Context = React.createContext();

class Provider extends React.Component {
  state = {
    loading: false,
    isAuthenticated: false,
    user: {},
    test: 'Hejsaaaan'
  };

  componentWillMount() {
    this.getUser();
  }

  login = (event, data) => {
    const dataToSend = { email: data.data.email, password: data.data.password };
    console.log(dataToSend);
    event.preventDefault();
    fetch(`${window.location.protocol}//localhost:4000/api/login`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.setState({ isAuthenticated: true, user: res.user });
          this.props.history.push('/secret');
        }
      })
      .catch(err => console.log(err));
  };

  getUser = () => {
    fetch(`${window.location.protocol}//localhost:4000/api/login`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        if (res.authenticated) {
          console.log(res);
          this.setState({ isAuthenticated: true, user: res.user });
        } else {
          console.log('Not authenticated');
        }
      })
      .catch(err => console.log(err));
  };

  register = (event, data) => {
    event.preventDefault();
    fetch(`${window.location.protocol}//localhost:4000/api/register`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        res.success && this.getUser();
        !res.success && console.log(res.message);
      });
  };

  render() {
    const val = {
      data: this.state,
      methods: {
        login: this.login,
        register: this.register
      }
    };
    return <Context.Provider value={val}>{this.props.children}</Context.Provider>;
  }
}

export default withRouter(Provider);
