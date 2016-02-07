export const ADD_CHARACTER = 'ADD_CHARACTER';
export const ADD_NPC = 'ADD_NPC';
export const REMOVE_COMBATANT = 'REMOVE_COMBATANT';
export const NEXT_TURN = 'NEXT_TURN';
export const END_COMBAT = 'END_COMBAT';

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
