import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute} from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import routes from './Router';
import Promise_Handler from './middleware/promise_Handler';
import reduxThunk from 'redux-thunk';

//Redux Thunk gives us direct access to the dispatch method
const createStoreWithMiddleware = applyMiddleware(reduxThunk,Promise_Handler)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>

  , document.getElementById('app'));




