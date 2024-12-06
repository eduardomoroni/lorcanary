/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { luisaMadrigalRockOfTheFamily } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Luisa Madrigal - Rock of the Family", () => {
  it.skip("**I'M THE STRONG ONE** While you have another character in play, this character gets +2 ※.", () => {
    const testStore = new TestStore({
      inkwell: luisaMadrigalRockOfTheFamily.cost,
      play: [luisaMadrigalRockOfTheFamily],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      luisaMadrigalRockOfTheFamily.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
