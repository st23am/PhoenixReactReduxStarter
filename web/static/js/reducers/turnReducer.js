import React from 'react';
import * as _ from 'lodash';

export default function turnReducer(state, action) {
  switch (action.type) {
    case 'NEXT_TURN':
      if(_.isEmpty(state.combatants)) { return state; };
      let currentTurn = [];
      let index = 0;
      let roundNumber = state.roundNumber || 1;
      let turnNumber = state.turnNumber || 0;

      if(_.isEmpty(state.currentTurn)){
        currentTurn = [state.combatants[0]];
      } else {
        index = _.findIndex(state.combatants, function(c) { return c.name == state.currentTurn[0].name; }) + 1;
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

    case 'ADD_CHARACTER':
      let combatantsPlusCharacter = _.orderBy([...state.combatants, action.character], ['init', 'agi'], ['desc', 'desc']);
      return { ...state, combatants:  combatantsPlusCharacter };

  case 'ADD_NPC':
      let combatantsPlusNPC = _.orderBy([...state.combatants, action.npc], ['init', 'agi'], ['desc', 'desc']);
      return {...state, combatants: combatantsPlusNPC};

    case 'END_COMBAT':
     return {
       ...state,
       roundNumber: 1,
       turnNumber: 0,
       currentTurn: [],
       combatants: []
     };

    case 'REMOVE_COMBATANT':
      return state;

    default:
      return state;
  }
};
