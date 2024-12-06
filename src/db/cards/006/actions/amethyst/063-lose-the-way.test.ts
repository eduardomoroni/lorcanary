/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { loseTheWay } from "@lorcanito/lorcana-engine/cards/006/actions/actions";

describe("Lose The Way", () => {
  it.skip("Exert chosen character. Then, you may choose and discard a card. If you do, the exerted character can't ready at the start of their next turn.", async () => {
    const testEngine = new TestEngine({
      inkwell: loseTheWay.cost,
      play: [loseTheWay],
      hand: [loseTheWay],
    });

    await testEngine.playCard(loseTheWay);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
