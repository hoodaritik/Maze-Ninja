import './App.css';
import { useState } from 'react';
import { createBrowserHistory } from 'history'
import UnweightedGrid from './components/UnweightedGrid'
import WeightedGrid from './components/WeightedGrid'
import unweightedTestGrid from './test_samples/unweighted.js'
import weightedTestGrid from './test_samples/weighted.js'
import Ninja from './components/Ninja.js'
import GraphNinja from './components/GraphNinja.js'

import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  useHistory
} from 'react-router-dom'

const history = createBrowserHistory();

function App() {

  return (
    <BrowserRouter history={history}>
      <div className="App">
        <nav className="nav">
          <Ninja />
          <Link to="/">Home</Link>
          <Link to="/unweighted">Unweighted Graph</Link>
          <Link to="/weighted">Weighted Graph</Link>
        </nav>
        <Switch>
          <Route exact path="/">
            <h1>Hello there! Welcome to Maze Ninja.</h1>
            <GraphNinja />
          </Route>
          <Route path="/unweighted">
            <UnweightedGrid rows={25} columns={40} />
          </Route>
          <Route path="/weighted">
            <WeightedGrid rows={25} columns={40} range={20} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
