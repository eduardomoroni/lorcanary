/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { imStillHere } from "@lorcanito/lorcana-engine/cards/006/actions/actions";

describe("I'm Still Here", () => {
  it.skip("(A character with cost 3 or more can {E} to sing this song for free.)", async () => {
    const testEngine = new TestEngine({
      inkwell: imStillHere.cost,
      play: [imStillHere],
      hand: [imStillHere],
    });

    await testEngine.playCard(imStillHere);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });

  it.skip("Chosen character gains Resist +2 until the start of your next turn. Draw a card. (Damage dealt to them is reduced by 2.)", async () => {
    const testEngine = new TestEngine({
      inkwell: imStillHere.cost,
      play: [imStillHere],
      hand: [imStillHere],
    });

    await testEngine.playCard(imStillHere);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
