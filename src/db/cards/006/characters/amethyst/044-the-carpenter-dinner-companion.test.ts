/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { theCarpenterDinnerCompanion } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("The Carpenter - Dinner Companion", () => {
  it.skip("I'LL GET YOU! When this character is banished, you may exert chosen character.", async () => {
    const testEngine = new TestEngine({
      inkwell: theCarpenterDinnerCompanion.cost,
      play: [theCarpenterDinnerCompanion],
      hand: [theCarpenterDinnerCompanion],
    });

    await testEngine.playCard(theCarpenterDinnerCompanion);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
