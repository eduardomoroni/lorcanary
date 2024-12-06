/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { friarTuckPriestOfNottingham } from "@lorcanito/lorcana-engine/cards/003/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import {
  liloGalacticHero,
  mickeyMouseDetective,
  stichtNewDog,
} from "@lorcanito/lorcana-engine/cards/001/characters/characters";

describe("Friar Tuck - Priest of Nottingham", () => {
  describe("**YOU THIEVING SCOUNDREL** When you play this character, the player or players with the most cards in their hand chooses and discards a card.", () => {
    it("Same amount of cards in hand", async () => {
      const testEngine = new TestEngine(
        {
          inkwell: friarTuckPriestOfNottingham.cost,
          hand: [friarTuckPriestOfNottingham, liloGalacticHero],
          deck: 5,
        },
        {
          hand: [stichtNewDog],
          deck: 5,
        },
      );

      await testEngine.playCard(friarTuckPriestOfNottingham);
      expect(testEngine.stackLayers).toHaveLength(2);

      testEngine.changeActivePlayer("player_two");
      await testEngine.resolveTopOfStack({ targets: [stichtNewDog] }, true);
      testEngine.changeActivePlayer("player_one");
      await testEngine.resolveTopOfStack({ targets: [liloGalacticHero] });

      expect(testEngine.getZonesCardCount("player_one").hand).toEqual(0);
      expect(testEngine.getZonesCardCount("player_two").hand).toEqual(0);
    });

    it("No cards in hand", async () => {
      const testEngine = new TestEngine(
        {
          inkwell: friarTuckPriestOfNottingham.cost,
          hand: [friarTuckPriestOfNottingham],
          deck: 5,
        },
        {
          deck: 5,
        },
      );

      await testEngine.playCard(friarTuckPriestOfNottingham);
      expect(testEngine.stackLayers).toHaveLength(0);

      expect(testEngine.getZonesCardCount("player_one").hand).toEqual(0);
      expect(testEngine.getZonesCardCount("player_two").hand).toEqual(0);
    });

    it("opponent has more", async () => {
      const testEngine = new TestEngine(
        {
          inkwell: friarTuckPriestOfNottingham.cost,
          hand: [friarTuckPriestOfNottingham, liloGalacticHero],
          deck: 5,
        },
        {
          hand: [stichtNewDog, mickeyMouseDetective],
          deck: 5,
        },
      );

      await testEngine.playCard(friarTuckPriestOfNottingham);
      expect(testEngine.stackLayers).toHaveLength(1);

      testEngine.changeActivePlayer("player_two");
      await testEngine.resolveTopOfStack({ targets: [stichtNewDog] }, true);

      expect(testEngine.getZonesCardCount("player_one").hand).toEqual(1);
      expect(testEngine.getZonesCardCount("player_two").hand).toEqual(1);
    });

    it("active player has more", async () => {
      const testEngine = new TestEngine(
        {
          inkwell: friarTuckPriestOfNottingham.cost,
          hand: [
            friarTuckPriestOfNottingham,
            liloGalacticHero,
            mickeyMouseDetective,
          ],
          deck: 5,
        },
        {
          hand: [stichtNewDog],
          deck: 5,
        },
      );

      await testEngine.playCard(friarTuckPriestOfNottingham);
      expect(testEngine.stackLayers).toHaveLength(1);

      await testEngine.resolveTopOfStack({ targets: [liloGalacticHero] }, true);

      expect(testEngine.getZonesCardCount("player_one").hand).toEqual(1);
      expect(testEngine.getZonesCardCount("player_two").hand).toEqual(1);
    });
  });
});
