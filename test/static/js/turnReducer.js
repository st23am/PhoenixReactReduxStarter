import { expect } from 'chai';
import turnReducer from '../../../web/static/js/reducers/turnReducer';
import * as actions from '../../../web/static/js/actions';

describe('reducer', () => {
  it('returns the default state', () => {
    let result = turnReducer(undefined, {});

    let expectedResult = {
      roundNumber: 1,
      turnNumber: 0,
      currentTurn: [],
      characters: [],
      npcs: [],
      combatants: []
    };

    expect(result).to.deep.equal(expectedResult);
  });
});
