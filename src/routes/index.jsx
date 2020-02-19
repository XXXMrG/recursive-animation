import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import Index from './app';
import Ace from './ace';
import Example from './examples';

const App = () => {
  return (
    // the route have nest route shouldn't use exact
    <Router>
      <Switch>
        <Route exact path="/ace">
          <Ace />
        </Route>
        <Route path="/examples">
          <Example />
        </Route>
        <Route exact path="/">
          <Index />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
