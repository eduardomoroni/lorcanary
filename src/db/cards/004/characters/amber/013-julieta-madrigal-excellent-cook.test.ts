/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { julietaMadrigalExcellentCook } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Julieta Madrigal - Excellent Cook", () => {
  it.skip("**SIGNATURE RECIPE** When you play this character, you may remove up to 2 damage from chosen character. If you removed damage this way, you may draw a card.", () => {
    const testStore = new TestStore({
      inkwell: julietaMadrigalExcellentCook.cost,
      hand: [julietaMadrigalExcellentCook],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "hand",
      julietaMadrigalExcellentCook.id,
    );
    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
