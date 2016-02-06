import React from 'react';
import * as _ from 'lodash';

export const CurrentTurn = ({
  currentTurn,
  roundNumber,
  turnNumber,
  onEndCombat,
  onNextTurn
}) => (
  <div>
    {(() => {
      if(!_.isEmpty(currentTurn)) {
        return(
            <div>
              <h3>Round: {roundNumber} Turn {turnNumber}
              <button onClick={() => onEndCombat()}> Clear </button>
              </h3>
              <span>
                name: { currentTurn[0].name } HP: {currentTurn[0].hp} AC: {currentTurn[0].ac}
                <button onClick={() => onNextTurn()}> Next </button>
              </span>
            </div>);
      } else {
        return(
            <div>
              <span>
                <button onClick={() => onNextTurn()}> Begin </button>
              </span>
            </div>);
      }
    })()}
  </div>
);

