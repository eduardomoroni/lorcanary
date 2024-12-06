/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { unfortunateSituation } from "@lorcanito/lorcana-engine/cards/006/actions/actions";

describe("Unfortunate Situation", () => {
  it.skip("Each opponent chooses one of their characters and deals 4 damage to them.", async () => {
    const testEngine = new TestEngine({
      inkwell: unfortunateSituation.cost,
      play: [unfortunateSituation],
      hand: [unfortunateSituation],
    });

    await testEngine.playCard(unfortunateSituation);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
