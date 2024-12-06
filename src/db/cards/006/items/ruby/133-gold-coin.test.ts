/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { goldCoin } from "@lorcanito/lorcana-engine/cards/006/items/items";

describe("Gold Coin", () => {
  it.skip("GLITTERING ACCESS ↷, 1 {I}, Banish this item – Ready chosen character of yours. They can't quest for the rest of this turn.", async () => {
    const testEngine = new TestEngine({
      inkwell: goldCoin.cost,
      play: [goldCoin],
      hand: [goldCoin],
    });

    await testEngine.playCard(goldCoin);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
