import './App.css';
import { useState } from 'react';
import * as Actions from './components/util/actions';
import { useSelector, useDispatch } from 'react-redux';
import DonutGraph from './components/donutGraph';

function App() {
  // const [mainComponent, setComponent] = useState();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  let mainComponent = <DonutGraph />;

  return (
    <div className="App">
      <div className="header">
        <h1>Financial Advisor</h1>
      </div>
      <div className="main">
        {mainComponent}
      </div>
        <h1>Risk Level : {state.risk}</h1>
    </div>
  );
}

export default App;
