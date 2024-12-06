/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { tiggerInTheCrowsNest } from "@lorcanito/lorcana-engine/cards/006/characters/characters";
import {
  gatheringKnowledgeAndWisdom,
  rememberWhoYouAre,
} from "@lorcanito/lorcana-engine/cards/005/actions/actions";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { packTactics } from "@lorcanito/lorcana-engine/cards/002/actions/actions";

describe("Tigger - In the Crow’s Nest", () => {
  it("**SWASH YOUR BUCKLES** Whenever you play an action, this character gets +1 ※ and +1 ◆ this turn.", async () => {
    const testEngine = new TestEngine({
      inkwell: 90,
      play: [tiggerInTheCrowsNest],
      hand: [gatheringKnowledgeAndWisdom, rememberWhoYouAre, packTactics],
    });

    const cardUnderTest = testEngine.getCardModel(tiggerInTheCrowsNest);
    expect(cardUnderTest.hasEvasive).toBe(true);
    expect(cardUnderTest.strength).toBe(tiggerInTheCrowsNest.strength);
    expect(cardUnderTest.lore).toBe(tiggerInTheCrowsNest.lore);

    await testEngine.playCard(gatheringKnowledgeAndWisdom);
    expect(cardUnderTest.strength).toBe(tiggerInTheCrowsNest.strength + 1);
    expect(cardUnderTest.lore).toBe(tiggerInTheCrowsNest.lore + 1);

    await testEngine.playCard(rememberWhoYouAre);
    expect(cardUnderTest.strength).toBe(tiggerInTheCrowsNest.strength + 2);
    expect(cardUnderTest.lore).toBe(tiggerInTheCrowsNest.lore + 2);

    await testEngine.playCard(packTactics);
    expect(cardUnderTest.strength).toBe(tiggerInTheCrowsNest.strength + 3);
    expect(cardUnderTest.lore).toBe(tiggerInTheCrowsNest.lore + 3);
  });
});
