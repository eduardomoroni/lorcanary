/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { luckyThe_15thPuppy } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Lucky - The 15th Puppy", () => {
  it.skip("**GOOD AS NEW** ↷ – Reveal the top 3 cards of your deck. You may put each character card with cost 2 or less into your hand. Put the rest on the bottom of your deck in any order.**PUPPY LOVE** Whenever this character quests, if you have 4 or more other characters in play, your other characters get +1 ◆ this turn.", () => {
    const testStore = new TestStore({
      inkwell: luckyThe_15thPuppy.cost,
      play: [luckyThe_15thPuppy],
    });

    const cardUnderTest = testStore.getCard(luckyThe_15thPuppy);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
