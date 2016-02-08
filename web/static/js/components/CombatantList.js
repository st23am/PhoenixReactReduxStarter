import React from 'react';
import { Combatant } from './Combatant';

export const CombatantList = ({
  combatants,
  onRemoveCombatant
}) => (
  <div>
    <ul>
      { combatants.map((combatant, index) =>
                      <Combatant combatant={combatant}
                                 key={index + Math.random()}
                                 onClick={() => onRemoveCombatant(combatant)} />)
      }
    </ul>
  </div>
);
