import React from 'react';
import { Character } from './Character';

export const CharacterList = ({
  characters,
  onAddCharacter
}) => (
    <div>
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
