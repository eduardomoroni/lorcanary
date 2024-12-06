/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { rooLittlestPirate } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Roo - Littlest Pirate", () => {
  it.skip("I'M A PIRATE TOO! When you play this character, you may give chosen character -2 {S} until the start of your next turn.", async () => {
    const testEngine = new TestEngine({
      inkwell: rooLittlestPirate.cost,
      hand: [rooLittlestPirate],
    });

    await testEngine.playCard(rooLittlestPirate);
    await testEngine.acceptOptionalLayer();
    await testEngine.resolveTopOfStack({});
  });
});
