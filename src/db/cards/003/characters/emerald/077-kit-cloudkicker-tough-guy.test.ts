/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { kitCloudkickerToughGuy } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Kit Cloudkicker - Tough Guy", () => {
  it.skip("**SKYSURFING** When you play this character, you may return chosen opposing character with 2 ※ or less to their player's hand.", () => {
    const testStore = new TestStore({
      inkwell: kitCloudkickerToughGuy.cost,
      hand: [kitCloudkickerToughGuy],
    });

    const cardUnderTest = testStore.getCard(kitCloudkickerToughGuy);
    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
