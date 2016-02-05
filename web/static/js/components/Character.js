import React from 'react';

export const Character = ({
  character,
  onAddCharacter
}) => (
    <li key={character.id}>
    {character.name}
    <button onClick={() => onAddCharacter(character)}> + </button>
    </li>
);
