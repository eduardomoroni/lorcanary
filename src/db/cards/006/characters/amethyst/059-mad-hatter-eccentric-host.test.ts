/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import {
  madHatterEccentricHost,
  naveensUkulele,
  scrump,
} from "@lorcanito/lorcana-engine/cards/006";

describe("Mad Hatter - Eccentric Host", () => {
  describe("WE'LL HAVE TO LOOK INTO THIS Whenever this character quests, you may look at the top card of chosen player's deck. Put it on top of their deck or into their discard.", () => {
    it.failing(
      "should allow you to look at the top card of a player's deck and put it on top of their deck",
      async () => {
        const testEngine = new TestEngine(
          {
            play: [madHatterEccentricHost],
          },
          {
            deck: [naveensUkulele, scrump],
          },
        );

        const cardToDiscard = testEngine.getCardModel(scrump);

        expect(
          testEngine.store.tableStore.getTopDeckCard("player_two")?.instanceId,
        ).toEqual(cardToDiscard.instanceId);

        await testEngine.questCard(madHatterEccentricHost);

        await testEngine.resolveTopOfStack({
          scry: { top: [scrump] },
        });

        expect(cardToDiscard.zone).toBe("deck");
        expect(
          testEngine.store.tableStore.getTopDeckCard("player_two")?.instanceId,
        ).toEqual(cardToDiscard.instanceId);
      },
    );

    it.failing(
      "should allow you to look at the top card of a player's deck and put it into their discard",
      async () => {
        const testEngine = new TestEngine(
          {
            play: [madHatterEccentricHost],
          },
          {
            deck: [naveensUkulele, scrump],
          },
        );

        const cardToDiscard = testEngine.getCardModel(scrump);

        expect(
          testEngine.store.tableStore.getTopDeckCard("player_two")?.instanceId,
        ).toEqual(cardToDiscard.instanceId);

        await testEngine.questCard(madHatterEccentricHost);

        await testEngine.resolveTopOfStack({
          scry: { discard: [scrump] },
        });

        expect(cardToDiscard.zone).toBe("discard");
      },
    );
  });
});
