import React from 'react';
import * as _ from 'lodash';
import { ADD_CHARACTER,
         ADD_NPC,
         END_COMBAT,
         NEXT_TURN,
         RECEIVE_CHARACTERS,
         RECEIVE_NPCS,
         REMOVE_COMBATANT } from "../actions";

export default function turnReducer(state, action) {
  switch (action.type) {
    case ADD_CHARACTER:
      let combatantsPlusCharacter = _.orderBy([...state.combatants, action.character], ['init', 'agi'], ['desc', 'desc']);
      return { ...state, combatants:  combatantsPlusCharacter };

    case 'ADD_NPC':
      let combatantsPlusNPC = _.orderBy([...state.combatants, action.npc], ['init', 'agi'], ['desc', 'desc']);
      return {...state, combatants: combatantsPlusNPC};

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

    default:
      return state;
  };
};
