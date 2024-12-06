/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { snowWhiteUnexpectedHouseGuest } from "@lorcanito/lorcana-engine/cards/002/characters/characters";

describe("Snow White - Unexpected Houseguest", () => {
  it.skip("How Do You Do?", () => {
    const testStore = new TestStore({
      inkwell: snowWhiteUnexpectedHouseGuest.cost,
      play: [snowWhiteUnexpectedHouseGuest],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      snowWhiteUnexpectedHouseGuest.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
