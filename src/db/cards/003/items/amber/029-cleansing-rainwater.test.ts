/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { cleansingRainwater } from "@lorcanito/lorcana-engine/cards/003/items/items";
import {
  eeyoreOverstuffedDonkey,
  mamaOdieVoiceOfWisdom,
  pigletPoohPirateCaptain,
} from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Cleansing Rainwater", () => {
  describe("**ANCIENT POWER** Banish this item – Remove up to 2 damage from each of your characters.", () => {
    it("Remove 2 damage from characters", () => {
      const testStore = new TestStore({
        inkwell: 9,
        play: [
          cleansingRainwater,
          mamaOdieVoiceOfWisdom,
          pigletPoohPirateCaptain,
          eeyoreOverstuffedDonkey,
        ],
        discard: [],
      });

      const cardUnderTest = testStore.getByZoneAndId(
        "play",
        cleansingRainwater.id,
      );
      const damagedCharacter = testStore.getByZoneAndId(
        "play",
        mamaOdieVoiceOfWisdom.id,
      );
      const anotherDamagedCharacter = testStore.getByZoneAndId(
        "play",
        pigletPoohPirateCaptain.id,
      );
      const yetAnotherDamagedCharacter = testStore.getByZoneAndId(
        "play",
        eeyoreOverstuffedDonkey.id,
      );

      damagedCharacter.updateCardMeta({ damage: 2 });
      anotherDamagedCharacter.updateCardMeta({ damage: 2 });
      yetAnotherDamagedCharacter.updateCardMeta({ damage: 2 });

      cardUnderTest.activate();
      testStore.resolveTopOfStack();

      expect(damagedCharacter.meta.damage).toEqual(0);
      expect(anotherDamagedCharacter.meta.damage).toEqual(0);
      expect(yetAnotherDamagedCharacter.meta.damage).toEqual(0);
    });

    it("Remove up to 2 damage from characters", () => {
      const testStore = new TestStore({
        inkwell: 9,
        play: [
          cleansingRainwater,
          mamaOdieVoiceOfWisdom,
          pigletPoohPirateCaptain,
          eeyoreOverstuffedDonkey,
        ],
        discard: [],
      });

      const cardUnderTest = testStore.getByZoneAndId(
        "play",
        cleansingRainwater.id,
      );
      const damagedCharacter = testStore.getByZoneAndId(
        "play",
        mamaOdieVoiceOfWisdom.id,
      );
      const anotherDamagedCharacter = testStore.getByZoneAndId(
        "play",
        pigletPoohPirateCaptain.id,
      );
      const yetAnotherDamagedCharacter = testStore.getByZoneAndId(
        "play",
        eeyoreOverstuffedDonkey.id,
      );

      damagedCharacter.updateCardMeta({ damage: 5 });
      anotherDamagedCharacter.updateCardMeta({ damage: 1 });
      yetAnotherDamagedCharacter.updateCardMeta({ damage: 4 });

      cardUnderTest.activate();
      testStore.resolveTopOfStack();

      expect(damagedCharacter.meta.damage).toEqual(3);
      expect(anotherDamagedCharacter.meta.damage).toEqual(0);
      expect(yetAnotherDamagedCharacter.meta.damage).toEqual(2);
    });
  });
});
