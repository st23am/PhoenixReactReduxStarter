import React from 'react';

export const Combatant = ({
  combatant
}) => (
  <li key={combatant.id}>{combatant.name} init:{combatant.init} hp:{combatant.hp} ac:{combatant.ac}</li>
);

