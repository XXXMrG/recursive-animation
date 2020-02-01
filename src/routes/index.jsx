import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Index from './App';
import CodeMirror from './CodeMirror';

const App = () => {
  return (
    <Router>
      <Route exact component={Index} path="/" />
      <Route exact component={CodeMirror} path="/codemirror" />
    </Router>
  );
};

export default App;
