/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { mrBigShrewdTycoon } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Mr. Big - Shrewd Tycoon", () => {
  it.skip("REPUTATION This character can't be challenged by characters with 2 {S} or more.", async () => {
    const testEngine = new TestEngine({
      inkwell: mrBigShrewdTycoon.cost,
      play: [mrBigShrewdTycoon],
      hand: [mrBigShrewdTycoon],
    });

    await testEngine.playCard(mrBigShrewdTycoon);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
