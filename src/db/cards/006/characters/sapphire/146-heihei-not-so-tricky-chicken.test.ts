/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { heiheiNotsotrickyChicken } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Heihei - Not-So-Tricky Chicken", () => {
  it.skip("EAT ANYTHING When you play this character, exert chosen opposing item. It can't ready at the start of its next turn.", async () => {
    const testEngine = new TestEngine({
      inkwell: heiheiNotsotrickyChicken.cost,
      hand: [heiheiNotsotrickyChicken],
    });

    await testEngine.playCard(heiheiNotsotrickyChicken);
    await testEngine.acceptOptionalLayer();
    await testEngine.resolveTopOfStack({});
  });

  it.skip("OUT TO LUNCH During your turn, this character gains Evasive. (They can challenge characters with Evasive.)", async () => {
    const testEngine = new TestEngine({
      inkwell: heiheiNotsotrickyChicken.cost,
      play: [heiheiNotsotrickyChicken],
      hand: [heiheiNotsotrickyChicken],
    });

    await testEngine.playCard(heiheiNotsotrickyChicken);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
