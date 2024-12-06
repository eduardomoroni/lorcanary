/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { longboat } from "@lorcanito/lorcana-engine/cards/006/items/items";

describe("Longboat", () => {
  it.skip("TAKE IT FOR A SPIN 2 {I} – Chosen character of yours gains Evasive until the start of your next turn. (Only characters with Evasive can challenge them.)", async () => {
    const testEngine = new TestEngine({
      inkwell: longboat.cost,
      play: [longboat],
      hand: [longboat],
    });

    await testEngine.playCard(longboat);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
