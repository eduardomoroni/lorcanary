/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { theLamp } from "@lorcanito/lorcana-engine/cards/003/items/items";
import { jafarDreadnought } from "@lorcanito/lorcana-engine/cards/002/characters/characters";
import {
  aladdinStreetRat,
  genieOnTheJob,
  hadesLordOfUnderworld,
} from "@lorcanito/lorcana-engine/cards/001/characters/characters";

describe("The Lamp", () => {
  describe("**GOOD OR EVIL** Banish this item – If you have a character named Jafar in play, draw 2 cards. If you have a character named Genie in play, return chosen character with cost 4 or less to their player's hand.", () => {
    it("should draw 2 cards if you have a character named Jafar in play", () => {
      const testStore = new TestStore({
        inkwell: theLamp.cost,
        play: [theLamp, jafarDreadnought],
        deck: 4,
      });

      const cardUnderTest = testStore.getCard(theLamp);

      cardUnderTest.activate();

      expect(cardUnderTest.zone).toBe("discard");
      expect(testStore.getZonesCardCount()).toEqual(
        expect.objectContaining({
          deck: 2,
          hand: 2,
        }),
      );
      expect(testStore.stackLayers).toHaveLength(0);
    });

    it("should return a character with cost 4 or less to their player's hand if you have a character named Genie in play", () => {
      const testStore = new TestStore(
        {
          inkwell: theLamp.cost,
          play: [theLamp, genieOnTheJob],
          deck: 4,
        },
        {
          play: [hadesLordOfUnderworld],
        },
      );

      const cardUnderTest = testStore.getCard(theLamp);
      const target = testStore.getCard(hadesLordOfUnderworld);

      cardUnderTest.activate();
      testStore.resolveTopOfStack({ targets: [target] });

      expect(cardUnderTest.zone).toBe("discard");
      expect(target.zone).toBe("hand");
      expect(testStore.getZonesCardCount()).toEqual(
        expect.objectContaining({
          deck: 4,
        }),
      );
      expect(testStore.stackLayers).toHaveLength(0);
    });

    it("should do both if you have both characters in play", () => {
      const testStore = new TestStore(
        {
          inkwell: theLamp.cost,
          play: [theLamp, genieOnTheJob, jafarDreadnought],
          deck: 4,
        },
        {
          play: [hadesLordOfUnderworld],
        },
      );

      const cardUnderTest = testStore.getCard(theLamp);
      const target = testStore.getCard(hadesLordOfUnderworld);

      cardUnderTest.activate();
      expect(cardUnderTest.zone).toBe("discard");

      // Draws before deciding who to return
      expect(target.zone).toBe("play");
      expect(testStore.getZonesCardCount()).toEqual(
        expect.objectContaining({
          deck: 2,
          hand: 2,
        }),
      );

      testStore.resolveTopOfStack({ targets: [target] });
      expect(target.zone).toBe("hand");

      expect(testStore.stackLayers).toHaveLength(0);
    });

    it("should do nothing if you don't have a character named Jafar or Genie in play", () => {
      const testStore = new TestStore(
        {
          inkwell: theLamp.cost,
          play: [theLamp, aladdinStreetRat],
          deck: 4,
        },
        {
          play: [hadesLordOfUnderworld],
        },
      );

      const cardUnderTest = testStore.getCard(theLamp);
      const target = testStore.getCard(hadesLordOfUnderworld);

      cardUnderTest.activate();
      expect(cardUnderTest.zone).toBe("discard");
      expect(testStore.stackLayers).toHaveLength(0);

      expect(target.zone).toBe("play");
      expect(testStore.getZonesCardCount()).toEqual(
        expect.objectContaining({
          deck: 4,
        }),
      );
    });
  });
});
