import thunk from 'redux-thunk';
import fetch        from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';

export const ADD_CHARACTER = 'ADD_CHARACTER';
export const ADD_NPC = 'ADD_NPC';
export const REMOVE_COMBATANT = 'REMOVE_COMBATANT';
export const NEXT_TURN = 'NEXT_TURN';
export const END_COMBAT = 'END_COMBAT';
export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS';
export const RECEIVE_NPCS = 'RECEIVE_NPCS';

// ASYNC Action Creators
export function getAllCharacters() {
  return dispatch => {
    fetch('/api/characters', { headers: defaultHeaders })
      .then(checkStatus)
      .then(parseJSON)
      .then((response) => {
        return dispatch(receiveCharacters(response.data));
      });
  };
};

export function getAllNPCS() {
  return dispatch => {
    fetch('/api/npcs', { headers: defaultHeaders })
      .then(checkStatus)
      .then(parseJSON)
      .then((response) => {
        return dispatch(receiveNPCS(response.data));
      });
  };
};

export function receiveNPCS(npcs) {
  return {type: RECEIVE_NPCS,
          npcs: npcs };
};

export function receiveCharacters(characters) {
  return {type: RECEIVE_CHARACTERS,
          characters: characters };
};

// Sync Action Creators
export function addCharacter(character) {
  return { type: ADD_CHARACTER, character: character };
}

export function addNPC(npc) {
  return { type: ADD_NPC, npc: npc };
}

export function removeCombatant(combatant) {
  return { type: REMOVE_COMBATANT, combatant: combatant };
}

export function nextTurn() {
  return { type: NEXT_TURN };
}

export function endCombat() {
  return { type: END_COMBAT };
}

// Utils extract later

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw response.statusText;
  }
};

function parseJSON(response) {
  return response.json();
};

