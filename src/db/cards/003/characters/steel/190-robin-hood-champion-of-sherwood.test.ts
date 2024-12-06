/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  robinHoodChampionOfSherwood,
  mrSmeeBumblingMate,
} from "@lorcanito/lorcana-engine/cards/003/characters/characters";
import { goofyKnightForADay } from "@lorcanito/lorcana-engine/cards/002/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";

describe("Robin Hood - Champion of Sherwood", () => {
  describe("**SKILLED COMBATANT** During your turn, whenever this character banishes another character in a challenge, gain 2 lore.", () => {
    it("should gain 2 lore when banishes another character in a challenge during your turn", () => {
      const testStore = new TestStore(
        {
          play: [robinHoodChampionOfSherwood],
        },
        {
          play: [mrSmeeBumblingMate],
        },
      );

      const attacker = testStore.getByZoneAndId(
        "play",
        robinHoodChampionOfSherwood.id,
      );
      const defender = testStore.getByZoneAndId(
        "play",
        mrSmeeBumblingMate.id,
        "player_two",
      );

      defender.updateCardMeta({ exerted: true });

      expect(testStore.store.tableStore.getTable("player_one").lore).toEqual(0);
      attacker.challenge(defender);
      expect(testStore.store.tableStore.getTable("player_one").lore).toEqual(2);
      expect(defender.zone).toEqual("discard");
    });

    it("should not gain 2 lore when banishes another character in a challenge during opponents turn", () => {
      const testStore = new TestStore(
        {
          play: [robinHoodChampionOfSherwood],
        },
        {
          play: [mrSmeeBumblingMate],
        },
      );

      const attacker = testStore.getByZoneAndId(
        "play",
        mrSmeeBumblingMate.id,
        "player_two",
      );
      const defender = testStore.getByZoneAndId(
        "play",
        robinHoodChampionOfSherwood.id,
      );

      defender.updateCardMeta({ exerted: true });

      expect(testStore.store.tableStore.getTable("player_one").lore).toEqual(0);
      attacker.challenge(defender);
      expect(testStore.store.tableStore.getTable("player_one").lore).toEqual(0);
    });
  });

  describe("**THE GOOD OF OTHERS** When this character is banished in a challenge, you may draw a card.", () => {
    it("When is banished in a challenge in your turn, you may draw a card.", async () => {
      const testEngine = new TestEngine(
        {
          play: [robinHoodChampionOfSherwood],
          deck: 1,
        },
        {
          play: [mrSmeeBumblingMate],
        },
      );

      const attacker = testEngine.getCardModel(robinHoodChampionOfSherwood);
      const defender = testEngine.getCardModel(mrSmeeBumblingMate);

      attacker.updateCardDamage(3);
      defender.updateCardMeta({ exerted: true });
      await testEngine.challenge({ attacker, defender });

      expect(attacker.zone).toEqual("discard");

      await testEngine.resolveOptionalAbility();

      expect(testEngine.getZonesCardCount().hand).toEqual(1);
    });

    it("When is banished in a challenge you may draw a card.", () => {
      const testStore = new TestStore(
        {
          play: [robinHoodChampionOfSherwood],
          deck: [mrSmeeBumblingMate],
        },
        {
          play: [goofyKnightForADay],
        },
      );

      const attacker = testStore.getCard(goofyKnightForADay);
      const defender = testStore.getCard(robinHoodChampionOfSherwood);

      defender.updateCardMeta({ exerted: true });
      attacker.challenge(defender);

      expect(attacker.zone).toEqual("play");
      expect(defender.zone).toEqual("discard");
      testStore.resolveOptionalAbility();
      expect(testStore.getZonesCardCount().hand).toEqual(1);
    });
  });
});
