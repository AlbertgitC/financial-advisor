import logo from './logo.svg';
import './App.css';
import * as Actions from './components/util/actions';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const riskLv = useSelector(state => state);
  const dispatch = useDispatch();

  function increment() {
    dispatch(Actions.increaseRisk());
  };

  function decrement() {
    dispatch(Actions.decreaseRisk());
  };

  return (
    <div className="App">
      
        <h1>Risk Level : {riskLv.risk}</h1>
        <button onClick={increment}>Risk +</button>
        <button onClick={decrement}>Risk -</button>
        
    </div>
  );
}

export default App;
