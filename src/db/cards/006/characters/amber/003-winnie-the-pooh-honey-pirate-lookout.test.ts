/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { winnieThePoohHoneyPirateLookout } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Winnie the Pooh - Honey Pirate Lookout", () => {
  it.skip("Support (Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)", async () => {
    const testEngine = new TestEngine({
      play: [winnieThePoohHoneyPirateLookout],
    });

    const cardUnderTest = testEngine.getCardModel(
      winnieThePoohHoneyPirateLookout,
    );
    expect(cardUnderTest.hasSupport).toBe(true);
  });

  it.skip("WE'RE PIRATES, YOU SEE Whenever this character quests, the next Pirate character you play this turn costs 1 {I} less.", async () => {
    const testEngine = new TestEngine({
      inkwell: winnieThePoohHoneyPirateLookout.cost,
      play: [winnieThePoohHoneyPirateLookout],
      hand: [winnieThePoohHoneyPirateLookout],
    });

    await testEngine.playCard(winnieThePoohHoneyPirateLookout);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
