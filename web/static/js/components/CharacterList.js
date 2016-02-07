import React from 'react';
import { Character } from './Character';

export const CharacterList = ({
  characters,
  onAddCharacter
}) => (
    <div>
    <h3> Characters </h3>
    <ul>
    { characters.map((character, index) =>
                     <Character
                     character={character}
                     key={index}
                     onAddCharacter={onAddCharacter} />
                    )}
  </ul>
    </div>
);
