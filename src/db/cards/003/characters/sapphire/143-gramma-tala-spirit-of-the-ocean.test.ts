/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { grammaTalaSpiritOfTheOcean } from "@lorcanito/lorcana-engine/cards/003/characters/characters";
import { aladdinBraveRescuer } from "@lorcanito/lorcana-engine/cards/004/characters/characters";
import { liloMakingAWish } from "@lorcanito/lorcana-engine/cards/001/characters/characters";
import {
  donaldDuckFocusedFlatfoot,
  tipoGrowingSon,
} from "@lorcanito/lorcana-engine/cards/005/characters/characters";
import { allFunnedOut } from "@lorcanito/lorcana-engine/cards/005/actions/actions";
import { letItGo } from "@lorcanito/lorcana-engine/cards/001/songs/songs";

describe("Gramma Tala - Spirit of the Ocean", () => {
  describe("**DO YOU KNOW WHO YOU ARE?** Whenever a card is put into your inkwell, gain 1 lore.", () => {
    it("Adding card from hand to inkwell should give +1 lore", () => {
      const testStore = new TestStore({
        play: [grammaTalaSpiritOfTheOcean],
        hand: [aladdinBraveRescuer, liloMakingAWish],
      });

      testStore.store.tableStore.getTable("player_one").lore = 0;

      const cardToPutInInkwell = testStore.getCard(aladdinBraveRescuer);
      cardToPutInInkwell.addToInkwell();

      expect(testStore.getPlayerLore()).toBe(1);
    });

    it("cards with effect that add to inkwell should also trigger ability", () => {
      const testStore = new TestStore({
        inkwell: 20,
        play: [grammaTalaSpiritOfTheOcean],
        hand: [
          tipoGrowingSon,
          liloMakingAWish,
          allFunnedOut,
          donaldDuckFocusedFlatfoot,
        ],
        deck: 1,
      });

      testStore.store.tableStore.getTable("player_one").lore = 0;

      const tipoCard = testStore.getCard(tipoGrowingSon);
      const allFunnedOutCard = testStore.getCard(allFunnedOut);
      const donaldDuckCard = testStore.getCard(donaldDuckFocusedFlatfoot);
      const cardToPutInInkwell = testStore.getCard(liloMakingAWish);
      tipoCard.playFromHand();
      testStore.resolveOptionalAbility();
      testStore.resolveTopOfStack({ targets: [cardToPutInInkwell] });

      expect(testStore.getPlayerLore()).toBe(1);

      allFunnedOutCard.playFromHand();
      testStore.resolveTopOfStack({ targets: [tipoCard] });

      expect(testStore.getPlayerLore()).toBe(2);

      donaldDuckCard.playFromHand();
      testStore.resolveOptionalAbility();

      expect(testStore.getPlayerLore()).toBe(3);
    });

    it("should gain lore when opponent puts cards into your inkweel", () => {
      const testStore = new TestStore(
        {
          inkwell: letItGo.cost,
          hand: [letItGo],
        },
        {
          play: [grammaTalaSpiritOfTheOcean, liloMakingAWish],
        },
      );

      testStore.store.tableStore.getTable("player_two").lore = 0;

      const letItGoCard = testStore.getCard(letItGo);
      const cardToPutInInkwell = testStore.getCard(liloMakingAWish);
      letItGoCard.playFromHand();

      testStore.resolveTopOfStack({ targets: [cardToPutInInkwell] });

      expect(testStore.getPlayerLore("player_two")).toBe(1);
    });

    it("should not gain lore when opponent puts gramma into your inkweel", () => {
      const testStore = new TestStore(
        {
          inkwell: letItGo.cost,
          hand: [letItGo],
        },
        {
          play: [grammaTalaSpiritOfTheOcean],
        },
      );

      testStore.store.tableStore.getTable("player_two").lore = 0;

      const letItGoCard = testStore.getCard(letItGo);
      const cardToPutInInkwell = testStore.getCard(grammaTalaSpiritOfTheOcean);
      letItGoCard.playFromHand();

      testStore.resolveTopOfStack({ targets: [cardToPutInInkwell] });

      expect(testStore.getPlayerLore("player_two")).toBe(0);
    });
  });
});
