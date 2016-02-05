import React from 'react';

export const NPC = ({
  npc,
  onAddNPC
}) => (
    <li key={npc.id}>
      {npc.name}
      <button onClick={() => onAddNPC(npc)}> + </button>
    </li>
);
