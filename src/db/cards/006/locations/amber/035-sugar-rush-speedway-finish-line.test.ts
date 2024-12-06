/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { sugarRushSpeedwayFinishLine } from "@lorcanito/lorcana-engine/cards/006/locations/locations";
import { sugarRushSpeedwayStartingLine } from "@lorcanito/lorcana-engine/cards/005/locations/locations";
import { vanellopeVonSchweetzSugarRushChamp } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Sugar Rush Speedway - Finish Line", () => {
  describe("BRING IT HOME, LITTLE ONE! When you move a character here from another location, you may banish this location to gain 3 lore and draw 3 cards.", () => {
    it("Moving from another location", async () => {
      const testEngine = new TestEngine({
        inkwell:
          sugarRushSpeedwayFinishLine.moveCost +
          sugarRushSpeedwayStartingLine.moveCost,
        play: [
          sugarRushSpeedwayStartingLine,
          sugarRushSpeedwayFinishLine,
          vanellopeVonSchweetzSugarRushChamp,
        ],
        deck: 10,
      });

      await testEngine.moveToLocation({
        location: sugarRushSpeedwayStartingLine,
        character: vanellopeVonSchweetzSugarRushChamp,
      });

      await testEngine.moveToLocation({
        location: sugarRushSpeedwayFinishLine,
        character: vanellopeVonSchweetzSugarRushChamp,
      });

      await testEngine.resolveOptionalAbility();

      expect(testEngine.getCardModel(sugarRushSpeedwayFinishLine).zone).toBe(
        "discard",
      );
      expect(testEngine.getPlayerLore()).toEqual(3);
      expect(testEngine.getZonesCardCount().hand).toEqual(3);
    });

    it("NOT Moving from another location", async () => {
      const testEngine = new TestEngine({
        inkwell: sugarRushSpeedwayFinishLine.moveCost,
        play: [sugarRushSpeedwayFinishLine, vanellopeVonSchweetzSugarRushChamp],
        deck: 5,
      });

      await testEngine.moveToLocation({
        location: sugarRushSpeedwayFinishLine,
        character: vanellopeVonSchweetzSugarRushChamp,
      });

      expect(testEngine.stackLayers).toHaveLength(0);
    });
  });
});
