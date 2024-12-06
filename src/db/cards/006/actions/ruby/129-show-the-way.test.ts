/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { showTheWay } from "@lorcanito/lorcana-engine/cards/006/actions/actions";

describe("Show The Way", () => {
  it.skip("Your characters get +2 {S} this turn.", async () => {
    const testEngine = new TestEngine({
      inkwell: showTheWay.cost,
      play: [showTheWay],
      hand: [showTheWay],
    });

    await testEngine.playCard(showTheWay);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
