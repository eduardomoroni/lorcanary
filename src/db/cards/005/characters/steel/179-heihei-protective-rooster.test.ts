/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { heiheiProtectiveRooster } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("HeiHei - Protective Rooster", () => {
  it.skip("", () => {
    const testStore = new TestStore({
      inkwell: heiheiProtectiveRooster.cost,
      play: [heiheiProtectiveRooster],
    });

    const cardUnderTest = testStore.getCard(heiheiProtectiveRooster);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
