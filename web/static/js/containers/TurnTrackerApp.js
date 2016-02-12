import React from 'react';
import { connect } from 'react-redux';
import { createCombatant, removeCombatant, nextTurn, endCombat } from "../actions";
import { TurnTracker } from '../components/TurnTracker';

const mapStateToProps = (state) => {
  return {
    roundNumber: state.roundNumber,
    turnNumber: state.turnNumber,
    currentTurn: state.currentTurn,
    combatants: state.combatants,
    npcs: state.npcs,
    characters: state.characters
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCombatant: (combatant) => {
      dispatch(createCombatant(combatant));
    },
    onRemoveCombatant: (combatant) => {
      dispatch(removeCombatant(combatant));
    },
    onNextTurn: () => {
      dispatch(nextTurn());
    },
    onEndCombat: () => {
      dispatch(endCombat());
    }
  };
};

export const TurnTrackerApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(TurnTracker);

