/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import {
  beastWounded,
  herculesClumsyKid,
  zeusMrLightningBolts,
} from "@lorcanito/lorcana-engine/cards/004/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";

describe("Zeus - Mr. Lightning Bolts", () => {
  it.failing(
    "**TARGET PRACTICE** Whenever this character challenges another character, he gets + ※ equal to the ※ of chosen character this turn.",
    async () => {
      const testEngine = new TestEngine(
        {
          play: [zeusMrLightningBolts],
        },
        {
          play: [beastWounded, herculesClumsyKid],
        },
      );

      const cardUnderTest = testEngine.getCardModel(zeusMrLightningBolts);

      await testEngine.tapCard(beastWounded);
      await testEngine.challenge({
        attacker: zeusMrLightningBolts,
        defender: beastWounded,
      });

      expect(cardUnderTest.strength).toBe(zeusMrLightningBolts.strength);
      await testEngine.resolveTopOfStack({ targets: [herculesClumsyKid] });
      expect(cardUnderTest.strength).toBe(
        zeusMrLightningBolts.strength + herculesClumsyKid.strength,
      );
    },
  );
});
