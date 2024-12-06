/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  diabloDevotedHerald,
  diabloMaleficentsSpy,
} from "@lorcanito/lorcana-engine/cards/004/characters/characters";
import { brawl } from "@lorcanito/lorcana-engine/cards/004/actions/actions";
import {
  aWholeNewWorld,
  friendsOnTheOtherSide,
} from "@lorcanito/lorcana-engine/cards/001/songs/songs";
import { dingleHopper } from "@lorcanito/lorcana-engine/cards/001/items/items";
import {
  chiefTui,
  magicBroomBucketBrigade,
  moanaOfMotunui,
  teKaTheBurningOne,
} from "@lorcanito/lorcana-engine/cards/001/characters/characters";
import { developYourBrain } from "@lorcanito/lorcana-engine/cards/001/actions/actions";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { hiramFlavershamToymaker } from "@lorcanito/lorcana-engine/cards/002/characters/characters";
import { pawpsicle } from "@lorcanito/lorcana-engine/cards/002/items/items";
import { diabloLoyalFamiliar } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Diablo - Devoted Herald", () => {
  it("**Evasive** _(Only characters with Evasive can challenge this character.)_", () => {
    const testStore = new TestStore({
      play: [diabloDevotedHerald],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      diabloDevotedHerald.id,
    );
    expect(cardUnderTest.hasEvasive).toBe(true);
  });

  it("**Shift: Discard an action card** _(You may discard an action card to play this on top of one of your characters named Diablo.)", () => {
    const testStore = new TestStore({
      inkwell: diabloDevotedHerald.cost,
      play: [diabloMaleficentsSpy],
      hand: [brawl, diabloDevotedHerald],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "hand",
      diabloDevotedHerald.id,
    );
    const cardToDiscard = testStore.getByZoneAndId("hand", brawl.id);
    const shiftTarget = testStore.getByZoneAndId(
      "play",
      diabloMaleficentsSpy.id,
    );

    cardUnderTest.shift(shiftTarget, cardToDiscard);

    expect(cardUnderTest.zone).toBe("play");
    expect(cardToDiscard.zone).toBe("discard");
  });

  describe("**CIRCLE FAR AND WIDE** During each opponent's turn, whenever they draw a card while this character is exerted, you may draw a card.", () => {
    it("Should trigger when opponent draws a card", () => {
      const testStore = new TestStore(
        {
          deck: 2,
          hand: [friendsOnTheOtherSide],
          inkwell: friendsOnTheOtherSide.cost,
        },
        {
          play: [diabloDevotedHerald],
          deck: 7,
        },
      );

      const cardUnderTest = testStore.getByZoneAndId(
        "play",
        diabloDevotedHerald.id,
        "player_two",
      );
      cardUnderTest.updateCardMeta({ exerted: true });
      expect(cardUnderTest.meta.exerted).toBe(true);

      const cardDraw = testStore.getByZoneAndId(
        "hand",
        friendsOnTheOtherSide.id,
      );

      cardDraw.playFromHand();
      testStore.changePlayer("player_two");

      testStore.resolveOptionalAbility();
      expect(testStore.getZonesCardCount("player_two")).toEqual(
        expect.objectContaining({ deck: 6, hand: 1 }),
      );

      testStore.resolveOptionalAbility();
      expect(testStore.getZonesCardCount("player_two")).toEqual(
        expect.objectContaining({ deck: 5, hand: 2 }),
      );

      expect(testStore.stackLayers).toHaveLength(0);
    });

    it("Should not trigger when Diablo is not exerted", function () {
      const testStore = new TestStore(
        {
          deck: 2,
          hand: [friendsOnTheOtherSide],
          inkwell: friendsOnTheOtherSide.cost,
        },
        {
          play: [diabloDevotedHerald],
          deck: 7,
        },
      );

      const cardUnderTest = testStore.getByZoneAndId(
        "play",
        diabloDevotedHerald.id,
        "player_two",
      );

      cardUnderTest.updateCardMeta({ exerted: false });
      expect(cardUnderTest.meta.exerted).toBe(false);

      const cardDraw = testStore.getByZoneAndId(
        "hand",
        friendsOnTheOtherSide.id,
      );

      cardDraw.playFromHand();

      expect(testStore.stackLayers).toHaveLength(0);
      expect(testStore.getZonesCardCount("player_two")).toEqual(
        expect.objectContaining({ deck: 7, hand: 0 }),
      );
    });

    it("Should not trigger on player's turn", function () {
      const testStore = new TestStore(
        {
          inkwell: aWholeNewWorld.cost,
          hand: [dingleHopper, aWholeNewWorld],
          play: [diabloDevotedHerald],
          deck: 7,
        },
        {
          hand: [magicBroomBucketBrigade, teKaTheBurningOne, moanaOfMotunui],
          deck: 7,
        },
      );

      const cardUnderTest = testStore.getByZoneAndId(
        "play",
        diabloDevotedHerald.id,
        "player_one",
      );

      cardUnderTest.updateCardMeta({ exerted: true });
      expect(cardUnderTest.meta.exerted).toBe(true);

      testStore.store.playCardFromHand(
        testStore.getByZoneAndId("hand", aWholeNewWorld.id).instanceId,
      );

      // At the end of aWholeNewWorld, the player should have drawn 7 cards thus creating 7 layers to resolve
      expect(testStore.stackLayers).toHaveLength(0);
    });

    it("Whole new world test case", () => {
      const testStore = new TestStore(
        {
          inkwell: aWholeNewWorld.cost,
          hand: [dingleHopper, aWholeNewWorld],
          deck: 7,
        },
        {
          hand: [magicBroomBucketBrigade, teKaTheBurningOne, moanaOfMotunui],
          play: [diabloDevotedHerald],
          deck: 7,
        },
      );

      const cardUnderTest = testStore.getByZoneAndId(
        "play",
        diabloDevotedHerald.id,
        "player_two",
      );

      cardUnderTest.updateCardMeta({ exerted: true });
      expect(cardUnderTest.meta.exerted).toBe(true);

      testStore.store.playCardFromHand(
        testStore.getByZoneAndId("hand", aWholeNewWorld.id).instanceId,
      );

      // At the end of aWholeNewWorld, the player should have drawn 7 cards thus creating 7 layers to resolve
      expect(testStore.stackLayers).toHaveLength(7);
    });
  });
});

describe("Regression", () => {
  it("Should NOT draw a card when player puts a card in card (instead of drawing)", function () {
    const testStore = new TestStore(
      {
        inkwell: developYourBrain.cost,
        hand: [developYourBrain],
        deck: [chiefTui, moanaOfMotunui],
      },
      {
        play: [diabloDevotedHerald],
        deck: 7,
      },
    );

    const cardUnderTest = testStore.getCard(diabloDevotedHerald);
    cardUnderTest.updateCardMeta({ exerted: true });
    expect(cardUnderTest.meta.exerted).toBe(true);

    const cardToPutInHand = testStore.getCard(developYourBrain);
    cardToPutInHand.playFromHand();

    const first = testStore.getCard(moanaOfMotunui);
    const second = testStore.getCard(chiefTui);
    testStore.resolveTopOfStack({ scry: { bottom: [first], hand: [second] } });

    expect(testStore.getZonesCardCount("player_one")).toEqual(
      expect.objectContaining({ deck: 1, hand: 1, discard: 1 }),
    );

    expect(testStore.getZonesCardCount("player_two")).toEqual(
      expect.objectContaining({ deck: 7, hand: 0 }),
    );

    expect(testStore.stackLayers).toHaveLength(0);
  });

  it("Should draw multiple cards, when opponent draws multiple", async () => {
    const testEngine = new TestEngine(
      {
        play: [hiramFlavershamToymaker, pawpsicle],
        deck: 5,
      },
      {
        play: [diabloDevotedHerald],
        deck: 5,
      },
    );

    await testEngine.tapCard(diabloDevotedHerald);

    await testEngine.questCard(
      hiramFlavershamToymaker,
      {
        targets: [pawpsicle],
      },
      true,
    );

    expect(testEngine.stackLayers).toHaveLength(2);
  });
});
