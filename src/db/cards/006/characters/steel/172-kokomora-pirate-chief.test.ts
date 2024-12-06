/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import {
  gadgetHackwrenchBrilliantBosun,
  galacticCouncilChamber,
  kakamoraBoardingParty,
  kokomoraPirateChief,
} from "@lorcanito/lorcana-engine/cards/006";

describe("Kokomora - Pirate Chief", () => {
  describe("COCONUT LEADER Whenever this character quests, you may draw a card. Then, choose and discard a card to deal 1 damage to chosen character or location. If a Pirate character card was discarded, deal 3 damage to that character or location instead.", () => {
    it("Discard a non-pirate card", async () => {
      const testEngine = new TestEngine({
        play: [kokomoraPirateChief, galacticCouncilChamber],
        hand: [gadgetHackwrenchBrilliantBosun],
      });

      await testEngine.questCard(kokomoraPirateChief);

      await testEngine.resolveOptionalAbility();
      await testEngine.resolveTopOfStack(
        {
          targets: [gadgetHackwrenchBrilliantBosun],
        },
        true,
      );
      await testEngine.resolveTopOfStack({
        targets: [galacticCouncilChamber],
      });

      expect(testEngine.getCardModel(galacticCouncilChamber).damage).toBe(1);
    });

    it("Discard a pirate card", async () => {
      const testEngine = new TestEngine({
        inkwell: kokomoraPirateChief.cost,
        play: [kokomoraPirateChief, galacticCouncilChamber],
        hand: [kakamoraBoardingParty],
      });

      await testEngine.questCard(kokomoraPirateChief);

      await testEngine.resolveOptionalAbility();
      await testEngine.resolveTopOfStack(
        {
          targets: [kakamoraBoardingParty],
        },
        true,
      );
      await testEngine.resolveTopOfStack({
        targets: [galacticCouncilChamber],
      });

      expect(testEngine.getCardModel(galacticCouncilChamber).damage).toBe(3);
    });
  });
});
