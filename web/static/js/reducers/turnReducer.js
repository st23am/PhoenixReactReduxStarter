import React from 'react';
import * as _ from 'lodash';
import { ADD_COMBATANT,
         ADD_COMBATANTS,
         END_COMBAT,
         NEXT_TURN,
         RECEIVE_CHARACTERS,
         RECEIVE_NPCS,
         REMOVE_COMBATANT } from "../actions";

let initialState = {
  roundNumber: 1,
  turnNumber: 0,
  currentTurn: [],
  characters: [],
  npcs: [],
  combatants: []
};

export default function turnReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COMBATANT':
      let combatant = Object.assign({}, action.combatant, {uid: Math.random()});
      let combatantsPlusCombatant = _.orderBy([...state.combatants, combatant], ['init', 'agiMod'], ['desc', 'desc']);
      return {...state, combatants: combatantsPlusCombatant};

    case 'ADD_COMBATANTS':
      if(_.isEmpty(action.combatants)){
        return state;
      }

      let combatants = _.forEach(action.combatants, function(value) {
        Object.assign({}, value, {uid: Math.random()});
      });
      let orderedCombatants = _.orderBy(combatants, ['init', 'agiMod'], ['desc', 'desc']);
      return {...state, combatants: orderedCombatants};

    case END_COMBAT:
      return {
          ...state,
        roundNumber: 1,
        turnNumber: 0,
        currentTurn: [],
        combatants: []
      };

    case REMOVE_COMBATANT:
      return state;

    case RECEIVE_CHARACTERS:
      if(_.isEmpty(action.characters)) {
        return state;
      } else {
        return {...state, characters: action.characters};
      };

    case RECEIVE_NPCS:
      if(_.isEmpty(action.npcs)) {
        return state;
      } else {
        return {...state, npcs: action.npcs};
      };

    case NEXT_TURN:
      if(_.isEmpty(state.combatants)) { return state; };
      let currentTurn = [];
      let index = 0;
      let roundNumber = state.roundNumber || 1;
      let turnNumber = state.turnNumber || 0;
      if(_.isEmpty(state.currentTurn)){
        currentTurn = [state.combatants[0]];
      } else {
        index = _.findIndex(state.combatants, function(c) { return (c.name == state.currentTurn[0].name && c.uid == state.currentTurn[0].uid); }) + 1;
        if(index === state.combatants.length) {
          roundNumber = state.roundNumber + 1;
          turnNumber = 0;
        }
        if(index >= state.combatants.length) {
          currentTurn = [state.combatants[0]];
        } else{
          currentTurn = [state.combatants[index]];
        }
      }
      return {
          ...state,
        roundNumber: roundNumber,
        turnNumber: turnNumber + 1,
        currentTurn: currentTurn
      };

    default:
      return state;
  };
};
