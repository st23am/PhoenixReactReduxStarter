import React from 'react';
import { NPC } from './NPC';

export const NPCList = ({
  npcs,
  onAddNPC
}) => (
  <div>
    <h3> NPCs </h3>
    <ul>
      { npcs.map((npc, index) =>
                 <NPC npc={npc} key={index} onAddNPC={onAddNPC}/>
                )}
    </ul>
  </div>
);

