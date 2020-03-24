import React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import Fibonacci from './fibonacci';
import Hanoi from './hanoi';

function Example() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  const { path, url } = useRouteMatch();
  return (
    <div style={{ backgroundColor: '#eaeaea' }}>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
          <Link to={`${url}/fibonacci`}>Fibonacci</Link>
        </Route>
        <Route path={`${path}/fibonacci`}>
          <Fibonacci />
        </Route>
        <Route path={`${path}/hanoi`}>
          <Hanoi />
        </Route>
      </Switch>
    </div>
  );
}

export default Example;
