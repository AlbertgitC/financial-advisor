import './App.css';
import { useState, useEffect } from 'react';
import * as Actions from './components/util/actions';
import { useSelector, useDispatch } from 'react-redux';
import DonutGraph from './components/donutGraph';

function App() {
  const [mainComponent, setComponent] = useState({ component: <DonutGraph /> });
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setComponent({ component: <DonutGraph setComponent={setComponent}/> });
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>Financial Advisor</h1>
      </div>
      <div className="main">
        {mainComponent.component}
      </div>
    </div>
  );
}

export default App;
