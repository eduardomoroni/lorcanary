/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { iagoReappearingParrot } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Iago - Reappearing Parrot", () => {
  it.skip("GUESS WHO When this character is banished in a challenge, return this card to your hand.", async () => {
    const testEngine = new TestEngine({
      inkwell: iagoReappearingParrot.cost,
      play: [iagoReappearingParrot],
      hand: [iagoReappearingParrot],
    });

    await testEngine.playCard(iagoReappearingParrot);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
