/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { galacticCommunicator } from "@lorcanito/lorcana-engine/cards/006/items/items";

describe("Galactic Communicator", () => {
  it.skip("RESOURCE ALLOCATION 1 {I}, Banish this item - Return chosen character with 2 {S} or less to their player's hand.", async () => {
    const testEngine = new TestEngine({
      inkwell: galacticCommunicator.cost,
      play: [galacticCommunicator],
      hand: [galacticCommunicator],
    });

    await testEngine.playCard(galacticCommunicator);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
