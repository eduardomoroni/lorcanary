/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import {
  basilDisguisedDetective,
  basilHypnotizedMouse,
  kakamoraPiratePitcher,
  michaelDarlingPlayfulSwordsman,
  rayaKumandranRider,
} from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Basil - Disguised Detective", () => {
  it("Shift 4 (You may pay 4 {I} to play this on top of one of your characters named Basil.)", async () => {
    const testEngine = new TestEngine({
      play: [basilDisguisedDetective],
    });

    const cardUnderTest = testEngine.getCardModel(basilDisguisedDetective);
    expect(cardUnderTest.hasShift).toBe(true);
  });

  it("TWISTS AND TURNS During your turn, whenever a card is put into your inkwell, you may pay 1 {I} to have chosen opponent choose and discard a card.", async () => {
    const testEngine = new TestEngine(
      {
        inkwell: 4 + 1,
        play: [basilHypnotizedMouse],
        hand: [kakamoraPiratePitcher, basilDisguisedDetective],
      },
      {
        inkwell: 1,
        hand: [rayaKumandranRider, michaelDarlingPlayfulSwordsman],
      },
    );

    await testEngine.shiftCard({
      shifter: basilDisguisedDetective,
      shifted: basilHypnotizedMouse,
    });

    await testEngine.putIntoInkwell(kakamoraPiratePitcher);

    expect(testEngine.getAvailableInkwellCardCount("player_one")).toBe(2);
    await testEngine.resolveOptionalAbility();
    expect(testEngine.getAvailableInkwellCardCount("player_one")).toBe(1);
    expect(testEngine.getAvailableInkwellCardCount("player_two")).toBe(1);

    testEngine.changeActivePlayer("player_two");
    await testEngine.resolveTopOfStack({ targets: [rayaKumandranRider] });

    expect(testEngine.getCardModel(rayaKumandranRider).zone).toEqual("discard");
    expect(testEngine.stackLayers).toHaveLength(0);
  });
});
