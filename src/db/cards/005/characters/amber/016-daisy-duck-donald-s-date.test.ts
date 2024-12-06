/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import {
  daisyDuckDonaldsDate,
  petePastryChomper,
} from "@lorcanito/lorcana-engine/cards/005/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { princeJohnGreediestOfAll } from "@lorcanito/lorcana-engine/cards/002/characters/characters";
import { breakFree } from "@lorcanito/lorcana-engine/cards/005/actions/actions";

describe("Daisy Duck - Donald's Date", () => {
  describe("**BIG PRIZE** Whenever this character quests, each opponent reveals the top card of their deck. If it’s a character card, they may put it into their hand. Otherwise, they put it on the bottom of their deck.", () => {
    it("reveals a character card and puts it into the hand", async () => {
      const testEngine = new TestEngine(
        {
          play: [daisyDuckDonaldsDate],
        },
        {
          deck: [petePastryChomper],
        },
      );

      await testEngine.questCard(daisyDuckDonaldsDate);

      await testEngine.changeActivePlayer("player_two");
      await testEngine.resolveTopOfStack({
        scry: { hand: [petePastryChomper], bottom: [] },
      });

      const target = testEngine.getCardModel(petePastryChomper);
      expect(target.zone).toBe("hand");
      expect(testEngine.getZonesCardCount("player_two")).toEqual(
        expect.objectContaining({ deck: 0 }),
      );
    });

    it("reveals a NON character card and puts it into the hand", async () => {
      const testEngine = new TestEngine(
        {
          play: [daisyDuckDonaldsDate],
        },
        {
          deck: [breakFree],
        },
      );

      await testEngine.questCard(daisyDuckDonaldsDate);

      await testEngine.changeActivePlayer("player_two");
      await testEngine.resolveTopOfStack({
        scry: { hand: [], bottom: [breakFree] },
      });

      const target = testEngine.getCardModel(breakFree);
      expect(target.zone).toBe("deck");
      expect(testEngine.getZonesCardCount("player_two")).toEqual(
        expect.objectContaining({ deck: 1, hand: 0 }),
      );
    });
  });
});

describe("Regression", () => {
  it("targets characters with ward from top of the deck", async () => {
    const testEngine = new TestEngine(
      {
        play: [daisyDuckDonaldsDate],
      },
      {
        deck: [princeJohnGreediestOfAll],
      },
    );

    await testEngine.questCard(daisyDuckDonaldsDate);

    testEngine.changeActivePlayer("player_two");
    await testEngine.resolveTopOfStack({
      scry: { hand: [princeJohnGreediestOfAll], bottom: [] },
    });

    expect(testEngine.getCardModel(princeJohnGreediestOfAll).zone).toBe("hand");
    expect(testEngine.getCardModel(princeJohnGreediestOfAll).isRevealed).toBe(
      true,
    );
    expect(testEngine.getZonesCardCount("player_two")).toEqual(
      expect.objectContaining({ deck: 0 }),
    );
  });
});
