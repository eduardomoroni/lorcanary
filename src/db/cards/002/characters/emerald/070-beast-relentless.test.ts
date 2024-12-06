/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  beastRelentless,
  donaldDuckPerfectGentleman,
  goofyKnightForADay,
} from "@lorcanito/lorcana-engine/cards/002/characters/characters";
import {
  dragonFire,
  fireTheCannons,
} from "@lorcanito/lorcana-engine/cards/001/actions/actions";

describe("Beast - Relentless", () => {
  describe("**SECOND WIND** Whenever an opposing character is damaged, you may ready this character.", () => {
    it("Beast himself challenging other", () => {
      const testStore = new TestStore(
        {
          inkwell: beastRelentless.cost,
          play: [beastRelentless],
        },
        {
          play: [donaldDuckPerfectGentleman],
        },
      );

      const cardUnderTest = testStore.getByZoneAndId(
        "play",
        beastRelentless.id,
      );
      const target = testStore.getByZoneAndId(
        "play",
        donaldDuckPerfectGentleman.id,
        "player_two",
      );

      target.updateCardMeta({ exerted: true });
      cardUnderTest.challenge(target);

      testStore.resolveOptionalAbility();

      expect(cardUnderTest.ready).toBe(true);
    });

    it("Damaged in combat", () => {
      const testStore = new TestStore(
        {
          inkwell: beastRelentless.cost,
          play: [beastRelentless, goofyKnightForADay],
        },
        {
          play: [donaldDuckPerfectGentleman],
        },
      );

      const cardUnderTest = testStore.getByZoneAndId(
        "play",
        beastRelentless.id,
      );
      const attacker = testStore.getByZoneAndId("play", goofyKnightForADay.id);
      const defender = testStore.getByZoneAndId(
        "play",
        donaldDuckPerfectGentleman.id,
        "player_two",
      );

      cardUnderTest.updateCardMeta({ exerted: true });
      defender.updateCardMeta({ exerted: true });

      attacker.challenge(defender);

      testStore.resolveOptionalAbility();

      expect(cardUnderTest.ready).toBe(true);
    });

    it("Damaged by action", () => {
      const testStore = new TestStore(
        {
          inkwell: fireTheCannons.cost,
          play: [beastRelentless],
          hand: [fireTheCannons],
        },
        {
          play: [donaldDuckPerfectGentleman],
        },
      );

      const cardUnderTest = testStore.getByZoneAndId(
        "play",
        beastRelentless.id,
      );
      const action = testStore.getByZoneAndId("hand", fireTheCannons.id);
      const target = testStore.getByZoneAndId(
        "play",
        donaldDuckPerfectGentleman.id,
        "player_two",
      );

      cardUnderTest.updateCardMeta({ exerted: true });

      action.playFromHand();
      testStore.resolveTopOfStack({ targets: [target] }, true);

      testStore.resolveOptionalAbility();

      expect(cardUnderTest.ready).toBe(true);
    });

    it("Self character being damaged", () => {
      const testStore = new TestStore({
        inkwell: fireTheCannons.cost,
        play: [beastRelentless, donaldDuckPerfectGentleman],
        hand: [fireTheCannons],
      });

      const cardUnderTest = testStore.getByZoneAndId(
        "play",
        beastRelentless.id,
      );
      const action = testStore.getByZoneAndId("hand", fireTheCannons.id);
      const target = testStore.getByZoneAndId(
        "play",
        donaldDuckPerfectGentleman.id,
      );

      cardUnderTest.updateCardMeta({ exerted: true });

      action.playFromHand();
      testStore.resolveTopOfStack({ targets: [target] });

      expect(cardUnderTest.ready).toBe(false);
    });

    it("Opposing character being banished", () => {
      const testStore = new TestStore(
        {
          inkwell: dragonFire.cost,
          play: [beastRelentless],
          hand: [dragonFire],
        },
        {
          play: [donaldDuckPerfectGentleman],
        },
      );

      const cardUnderTest = testStore.getByZoneAndId(
        "play",
        beastRelentless.id,
      );
      const action = testStore.getByZoneAndId("hand", dragonFire.id);
      const target = testStore.getByZoneAndId(
        "play",
        donaldDuckPerfectGentleman.id,
        "player_two",
      );

      cardUnderTest.updateCardMeta({ exerted: true });

      action.playFromHand();
      testStore.resolveTopOfStack({ targets: [target] });

      expect(cardUnderTest.ready).toBe(false);
    });

    it("Beast vs Beast", () => {
      const testStore = new TestStore(
        {
          play: [beastRelentless],
        },
        {
          play: [beastRelentless],
        },
      );

      const attacker = testStore.getByZoneAndId("play", beastRelentless.id);
      const defender = testStore.getByZoneAndId(
        "play",
        beastRelentless.id,
        "player_two",
      );

      defender.updateCardMeta({ exerted: true });
      attacker.challenge(defender);

      testStore.changePlayer("player_two");
      testStore.resolveOptionalAbility();
      testStore.changePlayer("player_one");
      testStore.resolveOptionalAbility();

      expect(attacker.ready).toBe(true);
      expect(defender.ready).toBe(true);
    });
  });
});
