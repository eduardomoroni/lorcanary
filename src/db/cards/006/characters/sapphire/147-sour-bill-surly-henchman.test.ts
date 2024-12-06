/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { sourBillSurlyHenchman } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Sour Bill - Surly Henchman", () => {
  it.skip("UNPALATABLE When you play this character, chosen opposing character gets -2 {S} this turn.", async () => {
    const testEngine = new TestEngine({
      inkwell: sourBillSurlyHenchman.cost,
      hand: [sourBillSurlyHenchman],
    });

    await testEngine.playCard(sourBillSurlyHenchman);
    await testEngine.acceptOptionalLayer();
    await testEngine.resolveTopOfStack({});
  });
});
