/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { maleficentMistressOfEvil } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Maleficent - Mistress of All Evil", () => {
  it.skip("**DARK KNOWLEDGE** Whenever this character quests, you may draw a card.**DIVINATION** During your turn, whenever you draw a card, you may move 1 damage counter from a chosen character to a chosen opposing character.", () => {
    const testStore = new TestStore({
      inkwell: maleficentMistressOfEvil.cost,
      play: [maleficentMistressOfEvil],
    });

    const cardUnderTest = testStore.getCard(maleficentMistressOfEvil);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
