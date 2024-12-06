/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import {
  magicBroomAerialCleaner,
  mickeyMousePlayfulSorcerer,
} from "@lorcanito/lorcana-engine/cards/004/characters/characters";
import { magicBroomBucketBrigade } from "@lorcanito/lorcana-engine/cards/001/characters/characters";

describe("Mickey Mouse - Playful Sorcerer", () => {
  it("**SWEEP AWAY** When you play this character, deal damage to chosen character equal to the number of Broom characters you have in play.", () => {
    const testEngine = new TestEngine({
      inkwell: mickeyMousePlayfulSorcerer.cost,
      hand: [mickeyMousePlayfulSorcerer],
      play: [magicBroomBucketBrigade, magicBroomAerialCleaner],
    });

    const cardUnderTest = testEngine.getCardModel(mickeyMousePlayfulSorcerer);
    const target = testEngine.getCardModel(magicBroomAerialCleaner);
    const expectedDamage = testEngine.getZonesCardCount().play;

    cardUnderTest.playFromHand();
    testEngine.resolveTopOfStack({ targets: [target] });

    expect(target.meta.damage).toEqual(expectedDamage);
  });

  it("**SWEEP AWAY** When you play this character, deal damage to chosen character equal to the number of Broom characters you have in play.", () => {
    const testEngine = new TestEngine(
      {
        inkwell: mickeyMousePlayfulSorcerer.cost,
        hand: [mickeyMousePlayfulSorcerer],
      },
      {
        play: [magicBroomBucketBrigade, magicBroomAerialCleaner],
      },
    );

    const cardUnderTest = testEngine.getCardModel(mickeyMousePlayfulSorcerer);
    const target = testEngine.getCardModel(magicBroomAerialCleaner);
    const expectedDamage = testEngine.getZonesCardCount().play;

    cardUnderTest.playFromHand();
    testEngine.resolveTopOfStack({ targets: [target] });

    expect(target.meta.damage).toEqual(expectedDamage);
  });
});
