/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { theQueenCruelestOfAll } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("The Queen - Cruelest of All", () => {
  it.skip("", () => {
    const testStore = new TestStore({
      inkwell: theQueenCruelestOfAll.cost,
      play: [theQueenCruelestOfAll],
    });

    const cardUnderTest = testStore.getCard(theQueenCruelestOfAll);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
