import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './components/util/store';
import * as Actions from './components/util/actions';

let defaultState = {
  risk: 1
};

let store = configureStore(defaultState);

function increment() {
  store.dispatch(Actions.increaseRisk());
  console.log(store.getState());
};

function decrement() {
  store.dispatch(Actions.decreaseRisk());
  console.log(store.getState());
};

ReactDOM.render(
  <React.StrictMode>
    <App store={store}>
      <button onClick={increment}>Risk +</button>
      <button onClick={decrement}>Risk -</button>
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
