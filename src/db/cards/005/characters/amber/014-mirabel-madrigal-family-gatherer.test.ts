/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  camiloMadrigalFamilyCopycat,
  mirabelMadrigalFamilyGatherer,
} from "@lorcanito/lorcana-engine/cards/005/characters/characters";
import {
  agustinMadrigalClumsyDad,
  antonioMadrigalAnimalExpert,
  camiloMadrigalPrankster,
  doloresMadrigalEasyListener,
  julietaMadrigalExcellentCook,
} from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Mirabel Madrigal - Family Gatherer", () => {
  describe("**NOT WITHOUT MY FAMILY** You can’t play this character unless you have 5 or more characters in play.", () => {
    it("Can't be played with fewer than 5 characters in play", () => {
      const testStore = new TestStore({
        inkwell: mirabelMadrigalFamilyGatherer.cost,
        hand: [mirabelMadrigalFamilyGatherer],
        play: [
          agustinMadrigalClumsyDad,
          camiloMadrigalFamilyCopycat,
          antonioMadrigalAnimalExpert,
          doloresMadrigalEasyListener,
        ],
      });

      const cardUnderTest = testStore.getCard(mirabelMadrigalFamilyGatherer);

      cardUnderTest.playFromHand();

      expect(cardUnderTest.zone).toEqual("hand");
    });

    it("Can be played with 5 or more characters in play", () => {
      const testStore = new TestStore({
        inkwell: mirabelMadrigalFamilyGatherer.cost,
        hand: [mirabelMadrigalFamilyGatherer],
        play: [
          agustinMadrigalClumsyDad,
          camiloMadrigalFamilyCopycat,
          antonioMadrigalAnimalExpert,
          doloresMadrigalEasyListener,
          julietaMadrigalExcellentCook,
        ],
      });

      const cardUnderTest = testStore.getCard(mirabelMadrigalFamilyGatherer);

      cardUnderTest.playFromHand();

      expect(cardUnderTest.zone).toEqual("play");
    });
  });
});
