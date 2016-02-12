import React, { Component } from 'react';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import turnReducer from '../reducers/turnReducer';
import { TurnTrackerApp } from './TurnTrackerApp';
import { subscribeCombatants, getAllCharacters, getAllNPCS } from '../actions';

const store = createStore(turnReducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default class App extends Component {

  componentDidMount() {
    store.dispatch(getAllCharacters());
    store.dispatch(getAllNPCS());
    store.dispatch(subscribeCombatants());
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <TurnTrackerApp  />
        </div>
      </Provider>
    );
  }
}

