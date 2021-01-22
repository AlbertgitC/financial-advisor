import './App.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DonutGraph from './components/donutGraph';
import { Switch, Route } from "react-router-dom";
import CalInvest from './components/calInvest';

function App() {

  return (
    <div className="App">
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
