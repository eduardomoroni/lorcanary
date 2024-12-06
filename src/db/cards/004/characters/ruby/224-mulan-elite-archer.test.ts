/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  cinderellaMelodyWeaver,
  mulanEliteArcher,
  mulanInjuredSoldier,
  peteRottenGuy,
  plutoRescueDog,
} from "@lorcanito/lorcana-engine/cards/004/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";

describe("Mulan - Elite Archer", () => {
  it("**Shift** 5 _(You may pay 5 ⬡ to play this on top of one of your characters named Mulan.)_", () => {
    const testStore = new TestStore({
      play: [mulanEliteArcher],
    });

    const cardUnderTest = testStore.getCard(mulanEliteArcher);
    expect(cardUnderTest.hasShift).toBe(true);
  });

  it("**STRAIGHT SHOOTER** When you play this character, if you used **Shift** to play her, she gets +3 ※ this turn.", () => {
    const testStore = new TestStore({
      inkwell: mulanEliteArcher.cost,
      hand: [mulanEliteArcher],
      play: [mulanInjuredSoldier],
    });

    const shifter = testStore.getCard(mulanEliteArcher);
    const shifted = testStore.getCard(mulanInjuredSoldier);

    shifter.shift(shifted);

    expect(shifter.strength).toBe(mulanEliteArcher.strength + 3);
  });

  describe("**TRIPLE SHOT** During your turn, whenever this character deals damage to another character in a challenge, deal the same amount of damage to up to 2 other chosen characters.", () => {
    it("During your turn", () => {
      const testStore = new TestStore(
        {
          inkwell: mulanEliteArcher.cost,
          play: [mulanEliteArcher],
        },
        {
          play: [cinderellaMelodyWeaver, plutoRescueDog, peteRottenGuy],
        },
      );

      const cardUnderTest = testStore.getByZoneAndId(
        "play",
        mulanEliteArcher.id,
      );

      const defender = testStore.getCard(cinderellaMelodyWeaver);
      const target1 = testStore.getCard(plutoRescueDog);
      const target2 = testStore.getCard(peteRottenGuy);

      defender.updateCardMeta({ exerted: true });

      cardUnderTest.challenge(defender);
      testStore.resolveTopOfStack({ targets: [target2, target1] });

      [defender, target1, target2].forEach((target) => {
        expect(target.damage).toBe(cardUnderTest.strength);
      });
    });

    it("During opponent's turn", async () => {
      const testEngine = new TestEngine(
        {
          play: [cinderellaMelodyWeaver],
        },
        {
          play: [mulanEliteArcher],
        },
      );

      const cardUnderTest = testEngine.getCardModel(mulanEliteArcher);
      const attacker = testEngine.getCardModel(cinderellaMelodyWeaver);

      cardUnderTest.updateCardMeta({ exerted: true });

      await testEngine.challenge({ attacker, defender: cardUnderTest });
      expect(testEngine.stackLayers).toHaveLength(0);
    });
  });
});
