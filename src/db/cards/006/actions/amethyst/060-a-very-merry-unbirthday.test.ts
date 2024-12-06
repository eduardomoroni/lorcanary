/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { aVeryMerryUnbirthday } from "@lorcanito/lorcana-engine/cards/006/actions/actions";

describe("A Very Merry Unbirthday", () => {
  it.skip("(A character with cost 1 or more can ↷ to sing this song for free.)", async () => {
    const testEngine = new TestEngine({
      inkwell: aVeryMerryUnbirthday.cost,
      play: [aVeryMerryUnbirthday],
      hand: [aVeryMerryUnbirthday],
    });

    await testEngine.playCard(aVeryMerryUnbirthday);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });

  it.skip("Each opponent puts the top 2 cards of their deck into their discard.", async () => {
    const testEngine = new TestEngine({
      inkwell: aVeryMerryUnbirthday.cost,
      play: [aVeryMerryUnbirthday],
      hand: [aVeryMerryUnbirthday],
    });

    await testEngine.playCard(aVeryMerryUnbirthday);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
