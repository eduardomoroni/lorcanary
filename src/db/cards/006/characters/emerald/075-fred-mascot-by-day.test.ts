/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { fredMascotByDay } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Fred - Mascot by Day", () => {
  it.skip("**HOW COOL IS THAT** Whenever this character is challenged, gain 2 lore.", () => {
    const testStore = new TestStore({
      inkwell: fredMascotByDay.cost,
      play: [fredMascotByDay],
    });

    const cardUnderTest = testStore.getCard(fredMascotByDay);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
