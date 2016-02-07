import React from 'react';
import { CharacterList } from './CharacterList';
import { NPCList } from './NPCList';
import { CombatantList } from './CombatantList';
import { CurrentTurn } from './CurrentTurn';


export const TurnTracker = ({
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
    <div className="col-lg-6">
      <CurrentTurn currentTurn={currentTurn} roundNumber={roundNumber} turnNumber={turnNumber} onNextTurn={onNextTurn} onEndCombat={onEndCombat}/>
      <CombatantList combatants={combatants} onRemoveCombatant={onRemoveCombatant}/>
    </div>
  </div>
);
