/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { everAsBefore } from "@lorcanito/lorcana-engine/cards/005/actions/actions";

describe("Ever as Before", () => {
  it.skip("_(A character with cost 2 or more can ↷ to sing this song for free.)_<br/>Remove up to 2 damage from any number of chosen characters.", () => {
    const testStore = new TestStore({
      inkwell: everAsBefore.cost,
      hand: [everAsBefore],
    });

    const cardUnderTest = testStore.getCard(everAsBefore);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
