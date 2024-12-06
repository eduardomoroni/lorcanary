/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  robinHoodSharpshooter,
  petePastryChomper,
  denahiAvengingBrother,
  daisyDuckSpotlessFoodfighter,
} from "@lorcanito/lorcana-engine/cards/005/characters/characters";
import { liloGalacticHero } from "@lorcanito/lorcana-engine/cards/001/characters/characters";
import { blastFromYourPast } from "@lorcanito/lorcana-engine/cards/005/actions/actions";

describe("Robin Hood - Sharpshooter", () => {
  it("**MY GREATEST PERFORMANCE** Whenever this character quests, look at the top 4 cards of your deck. You may reveal an action card with cost 6 or less and play it for free. Put the rest in your discard.", () => {
    const testStore = new TestStore({
      play: [robinHoodSharpshooter],
      deck: [
        liloGalacticHero,
        petePastryChomper,
        denahiAvengingBrother,
        daisyDuckSpotlessFoodfighter,
        blastFromYourPast,
      ],
    });

    const cardUnderTest = testStore.getCard(robinHoodSharpshooter);
    const target = testStore.getCard(blastFromYourPast);
    const notDiscarded = testStore.getCard(liloGalacticHero);
    const otherCards = [
      testStore.getCard(petePastryChomper),
      testStore.getCard(denahiAvengingBrother),
      testStore.getCard(daisyDuckSpotlessFoodfighter),
    ];

    cardUnderTest.quest();
    testStore.resolveTopOfStack(
      {
        scry: {
          discard: otherCards,
          play: [target],
        },
      },
      true,
    );

    expect(notDiscarded.zone).toBe("deck");
    otherCards.forEach((card) => {
      expect(card.zone).toBe("discard");
    });
    expect(testStore.stackLayers[0]?.name).toEqual(blastFromYourPast.name);
  });
});
