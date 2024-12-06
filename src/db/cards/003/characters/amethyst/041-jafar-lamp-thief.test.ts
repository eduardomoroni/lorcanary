/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { jafarLampThief } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Jafar - Lamp Thief", () => {
  it.skip("**I AM YOUR MASTER NOW** When you play this character, look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.", () => {
    const testStore = new TestStore({
      inkwell: jafarLampThief.cost,
      hand: [jafarLampThief],
    });

    const cardUnderTest = testStore.getByZoneAndId("hand", jafarLampThief.id);
    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
