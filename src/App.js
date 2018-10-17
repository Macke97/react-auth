import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import AuthRoute from './HOC/AuthRoute';
import MainNav from './components/MainNav/MainNav';
import Home from './components/Home/Home';
import Secret from './components/Secret/Secret';
class App extends Component {
  render() {
    return (
      <>
        <MainNav />
        <Container>
          <Switch>
            <Route path="/" exact component={Home} />
            <AuthRoute path="/secret" exact component={Secret} />

            <Route
              render={() => (
                <>
                  <h1>Oops! Något gick snett.</h1>
                  <p>Sidan du försöker nå finns tyvärr inte.</p>
                </>
              )}
            />
          </Switch>
        </Container>
      </>
    );
  }
}

export default App;
