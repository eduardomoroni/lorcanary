/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { goldenHarpEnchanterOfTheLand } from "@lorcanito/lorcana-engine/cards/004/characters/characters";
import { friendsOnTheOtherSide } from "@lorcanito/lorcana-engine/cards/001/songs/songs";

describe("Golden Harp - Enchanter of the Land", () => {
  describe("**STOLEN AWAY** At the end of your turn, if you didn't play a song this turn, banish this character.", () => {
    it("should banish the character if no song was played this turn", async () => {
      const testEngine = new TestEngine({
        play: [goldenHarpEnchanterOfTheLand],
      });

      await testEngine.passTurn();

      expect(testEngine.getCardModel(goldenHarpEnchanterOfTheLand).zone).toBe(
        "discard",
      );
    });
    it("should not banish the character if a song was played this turn", async () => {
      const testEngine = new TestEngine({
        inkwell: 3,
        play: [goldenHarpEnchanterOfTheLand],
        hand: [friendsOnTheOtherSide],
      });

      await testEngine.playCard(friendsOnTheOtherSide);
      await testEngine.passTurn();

      expect(testEngine.getCardModel(goldenHarpEnchanterOfTheLand).zone).toBe(
        "play",
      );
    });
  });
});
