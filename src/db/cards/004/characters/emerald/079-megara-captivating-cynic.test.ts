/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { megaraCaptivatingCynic } from "@lorcanito/lorcana-engine/cards/004/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { liloMakingAWish } from "@lorcanito/lorcana-engine/cards/001/characters/characters";

describe("Megara - Captivating Cynic", () => {
  describe("**SHADY DEAL** When you play this character, chose and discard a card or banish this character.", () => {
    it("skipping the effect banishes her", async () => {
      const testEngine = new TestEngine({
        inkwell: megaraCaptivatingCynic.cost,
        hand: [megaraCaptivatingCynic, liloMakingAWish],
      });

      const cardUnderTest = await testEngine.playCard(megaraCaptivatingCynic);
      await testEngine.skipTopOfStack();
      expect(cardUnderTest.zone).toEqual("discard");
    });

    it("discarding chosen card of yours", async () => {
      const testEngine = new TestEngine({
        inkwell: megaraCaptivatingCynic.cost,
        hand: [megaraCaptivatingCynic, liloMakingAWish],
      });

      const cardUnderTest = await testEngine.playCard(megaraCaptivatingCynic);
      await testEngine.acceptOptionalLayer();
      await testEngine.resolveTopOfStack({ targets: [liloMakingAWish] });

      expect(cardUnderTest.zone).toEqual("play");
      expect(testEngine.getCardZone(liloMakingAWish)).toEqual("discard");
    });
  });
});
