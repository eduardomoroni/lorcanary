/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { donaldDuckFirstMate } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Donald Duck - First Mate", () => {
  it.skip("CAPTAIN ON DECK While you have a Captain character in play, this character gets +2 ◆.", async () => {
    const testEngine = new TestEngine({
      inkwell: donaldDuckFirstMate.cost,
      play: [donaldDuckFirstMate],
      hand: [donaldDuckFirstMate],
    });

    await testEngine.playCard(donaldDuckFirstMate);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
