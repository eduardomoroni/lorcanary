/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { prepareToBoard } from "@lorcanito/lorcana-engine/cards/006/actions/actions";

describe("Prepare To Board!", () => {
  it.skip("Chosen character gets +2 {S} this turn. If a Pirate character is chosen, they get +3 {S} instead.", async () => {
    const testEngine = new TestEngine({
      inkwell: prepareToBoard.cost,
      play: [prepareToBoard],
      hand: [prepareToBoard],
    });

    await testEngine.playCard(prepareToBoard);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
