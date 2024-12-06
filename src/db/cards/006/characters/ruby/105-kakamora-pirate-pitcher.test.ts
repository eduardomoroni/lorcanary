/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { kakamoraPiratePitcher } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Kakamora - Pirate Pitcher", () => {
  it.skip("DIZZYING SPEED When you play this character, chosen Pirate character gains Evasive until the start of your next turn. (Only characters with Evasive can challenge them.)", async () => {
    const testEngine = new TestEngine({
      inkwell: kakamoraPiratePitcher.cost,
      hand: [kakamoraPiratePitcher],
    });

    await testEngine.playCard(kakamoraPiratePitcher);
    await testEngine.acceptOptionalLayer();
    await testEngine.resolveTopOfStack({});
  });
});
