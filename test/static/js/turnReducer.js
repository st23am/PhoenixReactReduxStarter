import { expect } from 'chai';
import turnReducer from '../../../web/static/js/reducers/turnReducer';
import * as actions from '../../../web/static/js/actions';

describe('reducer', () => {
  let initialState = {
    roundNumber: 1,
    turnNumber: 0,
    currentTurn: [],
    characters: [],
    npcs: [],
    combatants: []
  };

  describe("initialState", () => {
    it('returns the default state', () => {
      let result = turnReducer(undefined, {});

      expect(result).to.deep.equal(initialState);
    });
  });

  describe("CURRENT_TURN", () => {
    it('sets the current turn correctly', () => {
      let firstState   = turnReducer(initialState, actions.addCombatant({name: "Sue", init: 11, agiMod: 1}));
      let secondState  = turnReducer(firstState, actions.addCombatant({name: "Joe", init: 10, agiMod: 2}));
      let currentState = turnReducer(secondState, actions.addCombatant({name: "Goblin", init: 12, agiMod: 1}));

      let nextState = turnReducer(currentState, actions.nextTurn());

      expect(nextState.combatants[0].name).to.eq("Goblin");
    });

    context ("a tie for initiative", () => {
      it("gets resolved using agiMod", () => {
        let firstState  = turnReducer(initialState, actions.addCombatant({name: "Bugbear", init: 10, agiMod: 1}));
        let secondState = turnReducer(firstState, actions.addCombatant({name: "Goblin", init: 10, agiMod: 2}));
        let nextState = turnReducer(secondState, actions.nextTurn());

        expect(nextState.combatants[0].name).to.eq("Goblin");
      });
    });
  });
});
