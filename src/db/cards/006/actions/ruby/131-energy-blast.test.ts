/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { energyBlast } from "@lorcanito/lorcana-engine/cards/006/actions/actions";

describe("Energy Blast", () => {
  it.skip("Banish chosen character. Draw a card.", async () => {
    const testEngine = new TestEngine({
      inkwell: energyBlast.cost,
      play: [energyBlast],
      hand: [energyBlast],
    });

    await testEngine.playCard(energyBlast);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
