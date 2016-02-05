import React, { Component } from 'react';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import turnReducer from '../reducers/turnReducer';
import { TurnTrackerContainer } from './TurnTracker';

const finalCreateStore = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

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


const store = finalCreateStore(turnReducer, initialState);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <TurnTrackerContainer  />
        </div>
      </Provider>
    );
  }
}

