/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { mullinsSeasonedShipmate } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Mullins - Seasoned Shipmate", () => {
  it.skip("FALL IN LINE While you have a character named Mr. Smee in play, this character gains Resist +1. (Damage dealt to them is reduced by 1.)", async () => {
    const testEngine = new TestEngine({
      inkwell: mullinsSeasonedShipmate.cost,
      play: [mullinsSeasonedShipmate],
      hand: [mullinsSeasonedShipmate],
    });

    await testEngine.playCard(mullinsSeasonedShipmate);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
