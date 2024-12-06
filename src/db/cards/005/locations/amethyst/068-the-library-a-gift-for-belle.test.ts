/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { theLibraryAGiftForBelle } from "@lorcanito/lorcana-engine/cards/005/locations/locations";
import { chernabogsFollowersCreaturesOfEvil } from "@lorcanito/lorcana-engine/cards/003/characters/characters";
import { stichtNewDog } from "@lorcanito/lorcana-engine/cards/001/characters/characters";
import { fireTheCannons } from "@lorcanito/lorcana-engine/cards/001/actions/actions";
import { magicBroomIlluminaryKeeper } from "@lorcanito/lorcana-engine/cards/004/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";

describe("The Library - A Gift for Belle", () => {
  describe("**LOST IN A BOOK** Whenever a character is banished while here, you may draw a card.", () => {
    it("Removal", async () => {
      const testEngine = new TestEngine({
        inkwell: theLibraryAGiftForBelle.moveCost + fireTheCannons.cost,
        hand: [fireTheCannons],
        play: [theLibraryAGiftForBelle, stichtNewDog],
        deck: 5,
      });

      const cardUnderTest = testEngine.getCardModel(theLibraryAGiftForBelle);
      const targetCard = testEngine.getCardModel(stichtNewDog);
      const removal = testEngine.getCardModel(fireTheCannons);

      expect(
        testEngine.store.effectStore.getTriggeredAbilitiesForCard(
          targetCard,
          () => true,
        ),
      ).toHaveLength(0);
      targetCard.enterLocation(cardUnderTest);
      expect(
        testEngine.store.effectStore.getTriggeredAbilitiesForCard(
          targetCard,
          () => true,
        ),
      ).toHaveLength(1);

      expect(targetCard.isAtLocation(cardUnderTest)).toBe(true);

      await testEngine.playCard(removal);
      await testEngine.resolveTopOfStack({ targets: [targetCard] }, true);

      await testEngine.resolveOptionalAbility();

      expect(testEngine.getZonesCardCount().hand).toBe(1);
      expect(testEngine.getZonesCardCount().deck).toBe(4);
    });

    it("Chernabog's Followers", () => {
      const testStore = new TestStore({
        inkwell: theLibraryAGiftForBelle.moveCost,
        play: [theLibraryAGiftForBelle, chernabogsFollowersCreaturesOfEvil],
        deck: 5,
      });

      const cardUnderTest = testStore.getCard(theLibraryAGiftForBelle);
      const targetCard = testStore.getCard(chernabogsFollowersCreaturesOfEvil);

      targetCard.enterLocation(cardUnderTest);
      targetCard.quest();
      // Chernabo's Followers is banished and draws a card
      testStore.resolveOptionalAbility();

      // Draws a card from Library's effect
      testStore.resolveOptionalAbility();

      expect(testStore.getZonesCardCount().hand).toBe(2);
      expect(testStore.getZonesCardCount().deck).toBe(3);
    });
  });

  it("Magic Broom - Illuminary Keeper", () => {
    const testStore = new TestStore({
      inkwell:
        theLibraryAGiftForBelle.moveCost +
        chernabogsFollowersCreaturesOfEvil.cost,
      play: [theLibraryAGiftForBelle, magicBroomIlluminaryKeeper],
      hand: [chernabogsFollowersCreaturesOfEvil],
      deck: 5,
    });

    const cardUnderTest = testStore.getCard(theLibraryAGiftForBelle);
    const targetCard = testStore.getCard(magicBroomIlluminaryKeeper);

    targetCard.enterLocation(cardUnderTest);
    testStore.getCard(chernabogsFollowersCreaturesOfEvil).playFromHand();

    // Magic Broom Illuminary Keeper is banished and draws a card
    testStore.resolveOptionalAbility();

    // Draws a card from Library's effect
    testStore.resolveOptionalAbility();

    expect(testStore.getZonesCardCount().hand).toBe(2);
    expect(testStore.getZonesCardCount().deck).toBe(3);
  });
});
