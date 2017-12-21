import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// pages
import Dashboard from './pages/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}

export default App;