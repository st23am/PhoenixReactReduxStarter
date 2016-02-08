import React, { Component } from 'react';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import turnReducer from '../reducers/turnReducer';
import { TurnTrackerApp } from './TurnTrackerApp';
import { getAllCharacters } from '../actions';


let initialState = {
  roundNumber: 1,
  turnNumber: 0,
  currentTurn: [],
  characters: [],
  npcs: [
    {name: 'goblin', init: 7, hp: 3, ac: 10, agiMod: 2},
    {name: 'bugbear', init: 8, hp: 13, ac: 10, agiMod: 1},
    {name: 'hobgoblin', init: 4, hp: 7, ac: 12, agiMod: 1},
    {name: 'skeleton', init: 10, hp: 5, ac: 10, agiMod: 0},
  ],
  combatants: [
  ]
};

const store = createStore(turnReducer, initialState, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default class App extends Component {
  render() {
    store.dispatch(getAllCharacters());
    return (
      <Provider store={store}>
        <div>
          <TurnTrackerApp  />
        </div>
      </Provider>
    );
  }
}

