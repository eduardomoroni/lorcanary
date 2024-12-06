/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { naveensUkulele } from "@lorcanito/lorcana-engine/cards/006/items/items";

describe("Naveen's Ukulele", () => {
  it.skip("MAKE IT SING 1 {I}, Banish this item - Chosen character counts as having +3 cost to sing songs this turn.", async () => {
    const testEngine = new TestEngine({
      inkwell: naveensUkulele.cost,
      play: [naveensUkulele],
      hand: [naveensUkulele],
    });

    await testEngine.playCard(naveensUkulele);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
