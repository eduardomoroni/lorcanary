/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { thievery } from "@lorcanito/lorcana-engine/cards/006/actions/actions";

describe("Thievery", () => {
  it.skip("Chosen opponent loses 1 lore. Gain 1 lore.", async () => {
    const testEngine = new TestEngine({
      inkwell: thievery.cost,
      play: [thievery],
      hand: [thievery],
    });

    await testEngine.playCard(thievery);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
