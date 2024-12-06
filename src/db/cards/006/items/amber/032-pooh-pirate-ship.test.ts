/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { poohPirateShip } from "@lorcanito/lorcana-engine/cards/006/items/items";

describe("Pooh Pirate Ship", () => {
  it.skip("MAKE A RESCUE ↷, 3 {I} – Return a Pirate character card from your discard to your hand.", async () => {
    const testEngine = new TestEngine({
      inkwell: poohPirateShip.cost,
      play: [poohPirateShip],
      hand: [poohPirateShip],
    });

    await testEngine.playCard(poohPirateShip);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
