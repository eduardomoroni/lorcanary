/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { chernabogEvildoer } from "@lorcanito/lorcana-engine/cards/003/characters/characters";
import {
  arthurNoviceSparrow,
  chacaImpressiveDaughter,
  ludwigVonDrakeSelfproclaimedGenius,
  petePastryChomper,
  theQueenCruelestOfAll,
} from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Chernabog - Evildoer", () => {
  describe("**THE POWER OF EVIL** When you play this character, pay 1 ⬡ less for every character card in your discard.", () => {
    it("Playing full cost", () => {
      const testStore = new TestStore({
        inkwell: chernabogEvildoer.cost,
        hand: [chernabogEvildoer],
      });

      const cardUnderTest = testStore.getCard(chernabogEvildoer);

      cardUnderTest.playFromHand();

      expect(testStore.getAvailableInkwellCardCount("player_one")).toBe(0);
      expect(cardUnderTest.zone).toBe("play");
    });

    it("One damaged Character", () => {
      const testStore = new TestStore({
        inkwell: chernabogEvildoer.cost - 1,
        discard: [petePastryChomper],
        hand: [chernabogEvildoer],
      });

      const cardUnderTest = testStore.getCard(chernabogEvildoer);

      cardUnderTest.playFromHand();

      expect(testStore.getAvailableInkwellCardCount("player_one")).toBe(0);
      expect(cardUnderTest.zone).toBe("play");
    });

    it("Five damaged Character", () => {
      const testStore = new TestStore({
        inkwell: 5,
        discard: [
          petePastryChomper,
          arthurNoviceSparrow,
          chacaImpressiveDaughter,
          theQueenCruelestOfAll,
          ludwigVonDrakeSelfproclaimedGenius,
        ],
        hand: [chernabogEvildoer],
      });

      const cardUnderTest = testStore.getCard(chernabogEvildoer);

      cardUnderTest.playFromHand();

      expect(testStore.getAvailableInkwellCardCount("player_one")).toBe(0);
      expect(cardUnderTest.zone).toBe("play");
    });
  });

  it("**SUMMON THE SPIRITS** When you play this character, shuffle all character cards from your discard into your deck.", () => {
    const discard = [
      petePastryChomper,
      arthurNoviceSparrow,
      chacaImpressiveDaughter,
      theQueenCruelestOfAll,
      ludwigVonDrakeSelfproclaimedGenius,
    ];
    const testStore = new TestStore({
      inkwell: chernabogEvildoer.cost,
      discard: discard,
      hand: [chernabogEvildoer],
    });

    const cardUnderTest = testStore.getCard(chernabogEvildoer);

    cardUnderTest.playFromHand();

    expect(cardUnderTest.zone).toBe("play");
    discard.forEach((card) => {
      expect(testStore.getCard(card).zone).toBe("deck");
    });
  });
});
