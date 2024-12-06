/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { markowskiSpaceTrooper } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Markowski - Space Trooper", () => {
  it.skip("Evasive (Only characters with Evasive can challenge this character.)", async () => {
    const testEngine = new TestEngine({
      play: [markowskiSpaceTrooper],
    });

    const cardUnderTest = testEngine.getCardModel(markowskiSpaceTrooper);
    expect(cardUnderTest.hasEvasive).toBe(true);
  });
});
