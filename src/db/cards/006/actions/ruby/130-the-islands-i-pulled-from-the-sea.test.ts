/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { theIslandsIPulledFromTheSea } from "@lorcanito/lorcana-engine/cards/006/actions/actions";

describe("The Islands I Pulled From The Sea", () => {
  it.skip("(A character with cost 3 or more can {E} to sing this song for free.)", async () => {
    const testEngine = new TestEngine({
      inkwell: theIslandsIPulledFromTheSea.cost,
      play: [theIslandsIPulledFromTheSea],
      hand: [theIslandsIPulledFromTheSea],
    });

    await testEngine.playCard(theIslandsIPulledFromTheSea);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });

  it.skip("Search your deck for a location card, reveal that card to all players, and put it into your hand. Then, shuffle your deck.", async () => {
    const testEngine = new TestEngine({
      inkwell: theIslandsIPulledFromTheSea.cost,
      play: [theIslandsIPulledFromTheSea],
      hand: [theIslandsIPulledFromTheSea],
    });

    await testEngine.playCard(theIslandsIPulledFromTheSea);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
