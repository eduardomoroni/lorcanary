/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { submitToMyWill } from "@lorcanito/lorcana-engine/cards/006/actions/actions";

describe("Submit to My Will", () => {
  it.skip("Each opponent discards all cards in their hand.", async () => {
    const testEngine = new TestEngine({
      inkwell: submitToMyWill.cost,
      play: [submitToMyWill],
      hand: [submitToMyWill],
    });

    await testEngine.playCard(submitToMyWill);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
