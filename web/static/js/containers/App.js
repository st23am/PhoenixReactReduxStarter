import React, { Component } from 'react';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import DevTools from './DevTools';
import createLogger from 'redux-logger';
import turnReducer from '../reducers/turnReducer';
import { TurnTrackerContainer } from './TurnTracker';


let initialState = {
  roundNumber: 1,
  turnNumber: 0,
  currentTurn: [],
  characters: [
    {name: 'frank', init: 10, hp: 10, ac: 12, agiMod: 1},
    {name: 'joe', init: 7, hp: 10, ac: 12, agiMod: 0},
    {name: 'susan', init: 5, hp: 10, ac: 12, agiMod: 1},
  ],
  npcs: [
    {name: 'goblin', init: 7, hp: 3, ac: 10, agiMod: 2},
    {name: 'bugbear', init: 8, hp: 13, ac: 10, agiMod: 1},
    {name: 'hobgoblin', init: 4, hp: 7, ac: 12, agiMod: 1},
    {name: 'skeleton', init: 10, hp: 5, ac: 10, agiMod: 0},
  ],
  combatants: [
  ]
};

const logger = createLogger({collapsed: true});

const finalCreateStore = compose(
  DevTools.instrument(),
  applyMiddleware(thunk, promise, logger)
)(createStore);

const store = finalCreateStore(turnReducer, initialState);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <TurnTrackerContainer  />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

