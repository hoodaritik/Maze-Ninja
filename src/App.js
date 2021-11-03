import './App.css';
import UnweightedGrid from './components/UnweightedGrid'
import WeightedGrid from './components/WeightedGrid'
import unweightedTestGrid from './test_samples/unweighted.js'
import weightedTestGrid from './test_samples/weighted.js'

function App() {
  return (
    <div className="App">
      <UnweightedGrid rows={25} columns={40} />
      {/* <WeightedGrid rows={25} columns={40} range={20} /> */}
    </div>
  );
}

export default App;
