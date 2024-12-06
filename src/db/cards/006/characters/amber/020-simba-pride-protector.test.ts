/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { simbaPrideProtector } from "@lorcanito/lorcana-engine/cards/006/characters/characters";
import {
  aladdinCorneredSwordman,
  maleficentBinding,
  mauiDemiGod,
  mauiHeroToAll,
} from "@lorcanito/lorcana-engine/cards/001/characters/characters";

describe("Simba - Pride Protector", () => {
  it.skip("Shift 3 (You may pay 3 {I} to play this on top of one of your characters named Simba.)", async () => {
    const testEngine = new TestEngine({
      play: [simbaPrideProtector],
    });

    const cardUnderTest = testEngine.getCardModel(simbaPrideProtector);
    expect(cardUnderTest.hasShift).toBe(true);
  });

  it.skip("UNDERSTAND THE BALANCE At the end of your turn, if this character is exerted, you may ready your other characters.", async () => {
    const testEngine = new TestEngine({
      inkwell: simbaPrideProtector.cost,
      play: [simbaPrideProtector],
      hand: [simbaPrideProtector],
    });

    await testEngine.playCard(simbaPrideProtector);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});

describe("Regression", () => {
  it("Untapping reckless should not ask to challenge again", async () => {
    const testEngine = new TestEngine(
      {
        play: [simbaPrideProtector, mauiHeroToAll],
      },
      {
        play: [maleficentBinding, aladdinCorneredSwordman],
      },
    );

    for (const card of [maleficentBinding, aladdinCorneredSwordman]) {
      await testEngine.tapCard(card);
    }

    await testEngine.challenge({
      attacker: mauiHeroToAll,
      defender: aladdinCorneredSwordman,
    });

    await testEngine.passTurn();

    expect(testEngine.store.turnPlayer).toEqual("player_two");
  });
});
