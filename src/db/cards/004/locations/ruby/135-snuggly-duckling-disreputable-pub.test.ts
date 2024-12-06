/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { snugglyDucklingDisreputablePub } from "@lorcanito/lorcana-engine/cards/004/locations/locations";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import {
  hadesMeticulousPlotter,
  sisuWiseFriend,
  tongSurvivor,
  tukTukCuriousPartner,
} from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Snuggly Duckling - Disreputable Pub", () => {
  describe("**ROUTINE RUCKUS** Whenever a character with 3 ※ or more challenges another character while here, gain 1 lore. If the challenging character has 6 ※ or more, gain 3 lore instead.", () => {
    it("should not gain lore when a character with 2 ※ challenges another character", async () => {
      const testEngine = new TestEngine(
        {
          inkwell: snugglyDucklingDisreputablePub.moveCost,
          play: [snugglyDucklingDisreputablePub, tukTukCuriousPartner],
        },
        {
          play: [hadesMeticulousPlotter],
        },
      );

      await testEngine.tapCard(hadesMeticulousPlotter);
      await testEngine.moveToLocation({
        location: snugglyDucklingDisreputablePub,
        character: tukTukCuriousPartner,
      });

      await testEngine.challenge({
        attacker: tukTukCuriousPartner,
        defender: hadesMeticulousPlotter,
      });

      expect(testEngine.getPlayerLore()).toBe(0);
    });

    it("should gain 1 lore when a character with 3 ※ challenges another character", async () => {
      const testEngine = new TestEngine(
        {
          inkwell: snugglyDucklingDisreputablePub.moveCost,
          play: [snugglyDucklingDisreputablePub, tongSurvivor],
        },
        {
          play: [hadesMeticulousPlotter],
        },
      );

      await testEngine.tapCard(hadesMeticulousPlotter);
      await testEngine.moveToLocation({
        location: snugglyDucklingDisreputablePub,
        character: tongSurvivor,
      });

      await testEngine.challenge({
        attacker: tongSurvivor,
        defender: hadesMeticulousPlotter,
      });

      expect(testEngine.getPlayerLore()).toBe(1);
    });

    it("should gain 3 lore when a character with 6 ※ challenges another character", async () => {
      const testEngine = new TestEngine(
        {
          inkwell: snugglyDucklingDisreputablePub.moveCost,
          play: [snugglyDucklingDisreputablePub, sisuWiseFriend],
        },
        {
          play: [hadesMeticulousPlotter],
        },
      );

      await testEngine.tapCard(hadesMeticulousPlotter);
      await testEngine.moveToLocation({
        location: snugglyDucklingDisreputablePub,
        character: sisuWiseFriend,
      });

      await testEngine.challenge({
        attacker: sisuWiseFriend,
        defender: hadesMeticulousPlotter,
      });

      expect(testEngine.getPlayerLore()).toBe(3);
    });
  });
});
