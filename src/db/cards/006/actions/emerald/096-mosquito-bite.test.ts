/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { mosquitoBite } from "@lorcanito/lorcana-engine/cards/006/actions/actions";

describe("Mosquito Bite", () => {
  it.skip("Put 1 damage counter on chosen character.", async () => {
    const testEngine = new TestEngine({
      inkwell: mosquitoBite.cost,
      play: [mosquitoBite],
      hand: [mosquitoBite],
    });

    await testEngine.playCard(mosquitoBite);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
