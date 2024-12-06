/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { captainHookUnderhanded } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Captain Hook - Underhanded", () => {
  it.skip("INSPIRES DREAD While this character is exerted, opposing Pirate characters can't quest.", async () => {
    const testEngine = new TestEngine({
      inkwell: captainHookUnderhanded.cost,
      play: [captainHookUnderhanded],
      hand: [captainHookUnderhanded],
    });

    await testEngine.playCard(captainHookUnderhanded);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });

  it.skip("UPPER HAND Whenever this character is challenged, draw a card.", async () => {
    const testEngine = new TestEngine({
      inkwell: captainHookUnderhanded.cost,
      play: [captainHookUnderhanded],
      hand: [captainHookUnderhanded],
    });

    await testEngine.playCard(captainHookUnderhanded);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
