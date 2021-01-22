import './App.css';
import DonutGraph from './components/donutGraph';
import { Switch, Route, Redirect } from "react-router-dom";
import CalInvest from './components/calInvest';

function App() {

  return (
    <div className="App">
      <Redirect from="/" to="/chart" />
      <div className="header">
        <h1>Financial Advisor</h1>
      </div>
      <div className="main">
        <Switch>
          <Route path="/chart">
            <DonutGraph />
          </Route>
          <Route path="/calculator">
            <CalInvest />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
