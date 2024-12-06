/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { secondStarToTheRight } from "@lorcanito/lorcana-engine/cards/004/actions/actions";

describe("Second Star To The Right", () => {
  it.skip("**Sing Together** 10 _(Any number of your of your teammates' characters with total cost 10 or more may ↷ to sing this song for free.)_Chosen player draws 5 cards.", () => {
    const testStore = new TestStore({
      inkwell: secondStarToTheRight.cost,
      hand: [secondStarToTheRight],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "hand",
      secondStarToTheRight.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
