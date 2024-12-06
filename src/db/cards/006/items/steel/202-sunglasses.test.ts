/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { sunglasses } from "@lorcanito/lorcana-engine/cards/006/items/items";

describe("Sunglasses", () => {
  it.skip("SPYCRAFT {E} - Draw a card, then choose and discard a card.", async () => {
    const testEngine = new TestEngine({
      inkwell: sunglasses.cost,
      play: [sunglasses],
      hand: [sunglasses],
    });

    await testEngine.playCard(sunglasses);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
