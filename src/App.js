import './App.css';
import Grid from './components/Grid';
import testGrid from './test_samples/unweighted.js'

function App() {
  return (
    <div className="App">
      <Grid grid={testGrid} />
    </div>
  );
}

export default App;
