import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Index from './App';
import Ace from './ace';

const App = () => {
  return (
    <Router>
      <Route exact component={Index} path="/" />
      <Route exact component={Ace} path="/ace" />
    </Router>
  );
};

export default App;
