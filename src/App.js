import './App.css';
import { useState } from 'react';
import { createBrowserHistory } from 'history'
import UnweightedGrid from './components/UnweightedGrid'
import WeightedGrid from './components/WeightedGrid'
import unweightedTestGrid from './test_samples/unweighted.js'
import weightedTestGrid from './test_samples/weighted.js'
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  useHistory
} from 'react-router-dom'

const history = createBrowserHistory();

function App() {
  const [Rows, setRows] = useState();
  const [Columns, setColumns] = useState()

  return (
    <BrowserRouter history={history}>
      <div className="App">
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/unweighted">Unweighted Graph</Link>
          <Link to="/weighted">Weighted Graph</Link>
        </nav>
        <Switch>
          <Route exact path="/">
            <h1>Hello there!</h1>
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
