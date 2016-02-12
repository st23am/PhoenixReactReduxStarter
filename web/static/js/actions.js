import thunk from 'redux-thunk';
import fetch        from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import { Socket } from 'phoenix';


// Action Types
export const ADD_COMBATANT = 'ADD_COMBATANT';
export const ADD_COMBATANTS = 'ADD_COMBATANTS';
export const REMOVE_COMBATANT = 'REMOVE_COMBATANT';
export const NEXT_TURN = 'NEXT_TURN';
export const END_COMBAT = 'END_COMBAT';
export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS';
export const RECEIVE_NPCS = 'RECEIVE_NPCS';


// ASYNC Action Creators
let socket = new Socket("/socket");
socket.connect();
let channel = socket.channel('games:lobby');

export function subscribeCombatants() {
  return dispatch => {
    channel.join()
      .receive('ok', response => dispatch(addCombatants(response.gamestate)))
      .receive('error', reason => console.log('failed join', reason));

    channel.on('clear:gamestate', response => {
      dispatch(endCombat());
    });

    channel.on('new:combatant', response => {
      dispatch(addCombatant(response.data));
    });
  };
}

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

export function createCombatantRequest(combatant) {
  return dispatch => {
    let payload = {
      data: combatant
    };
    channel.push('new:combatant', payload)
      .receive('ok', response => {
        console.log('created Combatant');
      })
      .receive('error', error => {
        console.log('error');
      });
  };
}

export function endCombatRequest() {
  return dispatch => {
    channel.push('clear:gamestate', {})
      .receive('ok', response => {
        console.log('combat Ended');
      })
      .receive('error', error => {
        console.log('error ending combat');
      });
  };
}
export function receiveNPCS(npcs) {
  return {type: RECEIVE_NPCS,
          npcs: npcs };
};

export function receiveCharacters(characters) {
  return {type: RECEIVE_CHARACTERS,
          characters: characters };
};

// Sync Action Creators
export function addCombatants(combatants) {
  return { type: ADD_COMBATANTS, combatants: combatants} ;
};


export function addCombatant(combatant) {
  return { type: ADD_COMBATANT, combatant: combatant} ;
};

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

