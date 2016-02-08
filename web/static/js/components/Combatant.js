import React from 'react';

export const Combatant = ({
  combatant,
  key
}) => (
    <li key={key}>{combatant.name} init:{combatant.init} hp:{combatant.hp} ac:{combatant.ac} agiMod:{combatant.agiMod}</li>
);

