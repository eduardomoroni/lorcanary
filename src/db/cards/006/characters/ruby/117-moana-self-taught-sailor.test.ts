/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { moanaSelftaughtSailor } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Moana - Self-Taught Sailor", () => {
  it.skip("LEARNING THE ROPES This character can't challenge unless you have a Captain character in play.", async () => {
    const testEngine = new TestEngine({
      inkwell: moanaSelftaughtSailor.cost,
      play: [moanaSelftaughtSailor],
      hand: [moanaSelftaughtSailor],
    });

    await testEngine.playCard(moanaSelftaughtSailor);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
