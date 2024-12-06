/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  heiheiBoatSnack,
  mauiHeroToAll,
  moanaOfMotunui,
  teKaHeartless,
} from "@lorcanito/lorcana-engine/cards/001/characters/characters";
import { donaldDuckBuccaneer } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Donald Duck - Buccaneer", () => {
  describe("**BOARDING PARTY** During your turn, whenever this character banishes another character in a challenge, your other characters get +1 ◆ this turn.", () => {
    it("should deal two damage", () => {
      const otherCharacters = [moanaOfMotunui, mauiHeroToAll];
      const testStore = new TestStore(
        {
          play: [donaldDuckBuccaneer, ...otherCharacters],
        },
        {
          play: [heiheiBoatSnack, teKaHeartless],
        },
      );

      const attacker = testStore.getByZoneAndId("play", donaldDuckBuccaneer.id);
      const defender = testStore.getByZoneAndId(
        "play",
        heiheiBoatSnack.id,
        "player_two",
      );

      defender.updateCardMeta({ exerted: true });

      attacker.challenge(defender);

      otherCharacters.forEach((character) => {
        const card = testStore.getByZoneAndId(
          "play",
          character.id,
          "player_one",
        );

        expect(card.lore).toEqual((card.lorcanitoCard?.lore || 0) + 1);
      });
    });

    it("opponent's don't get the bonus", () => {
      const otherCharacters = [moanaOfMotunui, mauiHeroToAll];
      const testStore = new TestStore(
        {
          play: [donaldDuckBuccaneer, ...otherCharacters],
        },
        {
          play: [heiheiBoatSnack, teKaHeartless],
        },
      );

      const attacker = testStore.getByZoneAndId("play", donaldDuckBuccaneer.id);
      const defender = testStore.getByZoneAndId(
        "play",
        heiheiBoatSnack.id,
        "player_two",
      );

      defender.updateCardMeta({ exerted: true });

      attacker.challenge(defender);

      const card = testStore.getByZoneAndId(
        "play",
        teKaHeartless.id,
        "player_two",
      );

      expect(card.lore).not.toEqual((card.lorcanitoCard?.lore || 0) + 1);
    });

    it("Mulan itself doesn't get the bonus", () => {
      const testStore = new TestStore(
        {
          play: [donaldDuckBuccaneer],
        },
        {
          play: [heiheiBoatSnack, teKaHeartless],
        },
      );

      const attacker = testStore.getByZoneAndId("play", donaldDuckBuccaneer.id);
      const defender = testStore.getByZoneAndId(
        "play",
        heiheiBoatSnack.id,
        "player_two",
      );

      defender.updateCardMeta({ exerted: true });

      attacker.challenge(defender);

      expect(attacker.lore).not.toEqual(
        (attacker.lorcanitoCard?.lore || 0) + 1,
      );
    });
  });
});
