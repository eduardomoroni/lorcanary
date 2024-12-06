/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { turboRoyalHack } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Turbo - Royal Hack", () => {
  it.skip("", () => {
    const testStore = new TestStore({
      inkwell: turboRoyalHack.cost,
      play: [turboRoyalHack],
    });

    const cardUnderTest = testStore.getCard(turboRoyalHack);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });

  it.skip("**GAME JUMP** This character also counts as being named King Candy for **Shift**.", () => {
    const testStore = new TestStore({
      inkwell: turboRoyalHack.cost,
      play: [turboRoyalHack],
    });

    const cardUnderTest = testStore.getCard(turboRoyalHack);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
