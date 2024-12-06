/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { theSorcerersHat } from "@lorcanito/lorcana-engine/cards/003/items/items";
import {
  brunoMadrigalUndetectedUncle,
  luisaMadrigalMagicallyStrongOne,
} from "@lorcanito/lorcana-engine/cards/004/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { liloMakingAWish } from "@lorcanito/lorcana-engine/cards/001/characters/characters";

describe("The Sorcerer's Hat", () => {
  describe("**INCREDIBLE ENERGY** ↷, 1 ⬡ − Name a card, then reveal the top card of your deck. If it's the named card, put that card into your hand. Otherwise, put it on the top of your deck.", () => {
    it("Hit", async () => {
      const testEngine = new TestEngine({
        inkwell: 1,
        play: [theSorcerersHat],
        deck: [
          luisaMadrigalMagicallyStrongOne,
          liloMakingAWish,
          brunoMadrigalUndetectedUncle,
        ],
      });

      const bottomCard = testEngine.getCardModel(
        luisaMadrigalMagicallyStrongOne,
      );
      const topCard = testEngine.getCardModel(brunoMadrigalUndetectedUncle);

      await testEngine.activateCard(theSorcerersHat);
      await testEngine.resolveTopOfStack({
        nameACard: topCard.name,
      });

      expect(topCard.zone).toBe("hand");
      expect(bottomCard.zone).toBe("deck");
    });

    it("Miss", async () => {
      const testEngine = new TestEngine({
        inkwell: 1,
        play: [theSorcerersHat],
        deck: [
          luisaMadrigalMagicallyStrongOne,
          liloMakingAWish,
          brunoMadrigalUndetectedUncle,
        ],
      });

      const bottomCard = testEngine.getCardModel(
        luisaMadrigalMagicallyStrongOne,
      );
      const topCard = testEngine.getCardModel(brunoMadrigalUndetectedUncle);

      await testEngine.activateCard(theSorcerersHat);
      await testEngine.resolveTopOfStack({
        nameACard: bottomCard.name,
      });

      expect(topCard.isRevealed).toBe(true);
      expect(topCard.zone).toBe("deck");
      expect(bottomCard.zone).toBe("deck");
    });
  });
});
