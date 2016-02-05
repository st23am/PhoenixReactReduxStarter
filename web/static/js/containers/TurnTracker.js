import React from 'react';
import { connect } from 'react-redux';
import { CharacterList } from '../components/CharacterList';
import { NPCList } from '../components/NPCList';
import { CombatantList } from '../components/CombatantList';
import { CurrentTurn } from '../components/CurrentTurn';

const TurnTracker = ({
  currentTurn,
  characters,
  npcs,
  combatants,
  roundNumber,
  turnNumber,
  onAddCharacter,
  onAddNPC,
  onRemoveCombatant,
  onNextTurn,
  onEndCombat
}) => (
  <div>
    <div className="col-lg-6">
      <CharacterList characters={characters} onAddCharacter={onAddCharacter}/>
      <NPCList npcs={npcs} onAddNPC={ onAddNPC }/>
    </div>
    <div className="col-log-6">
      <CurrentTurn currentTurn={currentTurn} roundNumber={roundNumber} turnNumber={turnNumber} onNextTurn={onNextTurn} onEndCombat={onEndCombat}/>
      <CombatantList combatants={combatants} onRemoveCombatant={onRemoveCombatant}/>
    </div>
    </div>
);

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
    onAddCharacter: (character) => {
      dispatch({
        type: 'ADD_CHARACTER',
        character: character
      });
    },
    onAddNPC: (npc) => {
      dispatch({
        type: 'ADD_NPC',
        npc: npc
      });
    },
    onRemoveCombatant: (combatant) => {
      dispatch({
        type: 'REMOVE_COMBATANT',
        combatant: combatant
      });
    },
    onNextTurn: () => {
      dispatch({
        type: 'NEXT_TURN'
      });
    },
    onEndCombat: () => {
      dispatch({
        type: 'END_COMBAT'
      });
    }
  };
};

export const TurnTrackerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TurnTracker);

