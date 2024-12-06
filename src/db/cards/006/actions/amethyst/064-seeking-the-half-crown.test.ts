/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { seekingTheHalfCrown } from "@lorcanito/lorcana-engine/cards/006/actions/actions";

describe("Seeking The Half Crown", () => {
  it.skip("For each Sorcerer character you have in play, you pay 1 {I} less to play this action.", async () => {
    const testEngine = new TestEngine({
      inkwell: seekingTheHalfCrown.cost,
      play: [seekingTheHalfCrown],
      hand: [seekingTheHalfCrown],
    });

    await testEngine.playCard(seekingTheHalfCrown);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });

  it.skip("Draw 2 cards.", async () => {
    const testEngine = new TestEngine({
      inkwell: seekingTheHalfCrown.cost,
      play: [seekingTheHalfCrown],
      hand: [seekingTheHalfCrown],
    });

    await testEngine.playCard(seekingTheHalfCrown);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
