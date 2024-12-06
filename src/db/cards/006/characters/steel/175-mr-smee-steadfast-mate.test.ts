/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { mrSmeeSteadfastMate } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Mr. Smee - Steadfast Mate", () => {
  it.skip("GOOD CATCH During your turn, this character gains Evasive. (They can challenge characters with Evasive.)", async () => {
    const testEngine = new TestEngine({
      inkwell: mrSmeeSteadfastMate.cost,
      play: [mrSmeeSteadfastMate],
      hand: [mrSmeeSteadfastMate],
    });

    await testEngine.playCard(mrSmeeSteadfastMate);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
