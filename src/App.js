import './App.css';
import UnweightedGrid from './components/UnweightedGrid'
import WeightedGrid from './components/WeightedGrid'
import unweightedTestGrid from './test_samples/unweighted.js'
import weightedTestGrid from './test_samples/weighted.js'

function App() {
  return (
    <div className="App">
      {/* <Grid grid={unweightedTestGrid} /> */}
      <WeightedGrid grid={weightedTestGrid} />
    </div>
  );
}

export default App;
