/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { magicaDeSpellCruelSorceress } from "@lorcanito/lorcana-engine/cards/005/characters/characters";
import {
  aWholeNewWorld,
  suddenChill,
} from "@lorcanito/lorcana-engine/cards/001/songs/songs";
import {
  mickeyMouseDetective,
  moanaOfMotunui,
} from "@lorcanito/lorcana-engine/cards/001/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";

describe("Magica De Spell - Cruel Sorceress", () => {
  it("**PLAYING WITH POWER** During opponents’ turns, if an effect would cause you to discard one or more cards from your hand, you don’t discard.", () => {
    const testStore = new TestStore(
      {
        inkwell: suddenChill.cost,
        hand: [suddenChill],
      },
      {
        hand: [moanaOfMotunui],
        play: [magicaDeSpellCruelSorceress],
      },
    );

    const cardUnderTest = testStore.getByZoneAndId("hand", suddenChill.id);
    const target = testStore.getByZoneAndId(
      "hand",
      moanaOfMotunui.id,
      "player_two",
    );

    cardUnderTest.playFromHand();
    testStore.changePlayer().resolveTopOfStack({
      targets: [target],
    });

    expect(target.zone).toEqual("hand");
  });
});

describe("Regression", () => {
  it.only("'A whole new world' interaction.", async () => {
    const testEngine = new TestEngine(
      {
        inkwell: aWholeNewWorld.cost,
        hand: [aWholeNewWorld],
        deck: 10,
      },
      {
        deck: 10,
        hand: [moanaOfMotunui, mickeyMouseDetective],
        play: [magicaDeSpellCruelSorceress],
      },
    );

    await testEngine.playCard(aWholeNewWorld);

    expect(testEngine.getCardModel(moanaOfMotunui).zone).toEqual("hand");
    expect(testEngine.getCardModel(mickeyMouseDetective).zone).toEqual("hand");
    expect(testEngine.getZonesCardCount("player_two")).toEqual(
      expect.objectContaining({
        hand: 9, // The card is still in hand
        deck: 3,
      }),
    );
  });
});
