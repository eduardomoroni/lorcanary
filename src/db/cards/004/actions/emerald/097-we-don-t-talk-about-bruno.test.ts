/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  brawl,
  weDontTalkAboutBruno,
} from "@lorcanito/lorcana-engine/cards/004/actions/actions";
import {
  aladdinBraveRescuer,
  aladdinResoluteSwordsman,
  argesTheCyclops,
  herculesBelovedHero,
  sisuEmboldenedWarrior,
  theMusesProclaimersOfHeroes,
} from "@lorcanito/lorcana-engine/cards/004/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { ursulaDeceiverOfAll } from "@lorcanito/lorcana-engine/cards/003/characters/characters";
import {
  friendsOnTheOtherSide,
  suddenChill,
} from "@lorcanito/lorcana-engine/cards/001/songs/songs";
import {
  mauiHeroToAll,
  minniMouseAlwaysClassy,
  olafFriendlySnowman,
} from "@lorcanito/lorcana-engine/cards/001/characters/characters";

describe("We Don't Talk About Bruno", () => {
  it("should return  opponent chosen character to their player's hand and discard opponent card", () => {
    const testStore = new TestStore(
      {
        inkwell: weDontTalkAboutBruno.cost,
        hand: [weDontTalkAboutBruno],
      },
      {
        hand: [
          herculesBelovedHero,
          brawl,
          aladdinResoluteSwordsman,
          argesTheCyclops,
        ],
        play: [aladdinBraveRescuer],
      },
    );

    const cardUnderTest = testStore.getCard(weDontTalkAboutBruno);
    const target = testStore.getCard(aladdinBraveRescuer);

    cardUnderTest.playFromHand();
    testStore.resolveTopOfStack({ targets: [target] }, true);

    expect(target.zone).toBe("hand");

    expect(testStore.getZonesCardCount("player_two").hand).toBe(4);
    expect(testStore.getZonesCardCount("player_two").discard).toBe(1);
  });

  it("Return chosen character to their player's hand, then that player discards a card at random.", () => {
    const testStore = new TestStore(
      {
        inkwell: weDontTalkAboutBruno.cost,
        hand: [weDontTalkAboutBruno],
      },
      {
        play: [aladdinBraveRescuer],
        hand: [sisuEmboldenedWarrior],
      },
    );

    const cardUnderTest = testStore.getCard(weDontTalkAboutBruno);
    const target = testStore.getCard(aladdinBraveRescuer);

    cardUnderTest.playFromHand();
    testStore.resolveTopOfStack({ targets: [target] });
    expect(testStore.getZonesCardCount("player_two").hand).toBe(1);
  });

  it("No cards in hand and a single card in play", async () => {
    const testEngine = new TestEngine(
      {
        inkwell: weDontTalkAboutBruno.cost,
        hand: [weDontTalkAboutBruno],
      },
      {
        play: [aladdinBraveRescuer],
      },
    );

    await testEngine.playCard(weDontTalkAboutBruno);

    expect(testEngine.store.stackLayerStore.topLayer?.id).toContain("-move");
    expect(testEngine.store.stackLayerStore.layers).toHaveLength(2);

    await testEngine.resolveTopOfStack({ targets: [aladdinBraveRescuer] });

    expect(testEngine.getCardModel(aladdinBraveRescuer).zone).toBe("discard");
  });
});

describe("Regression", () => {
  it("Should not discard from hand if no valid target to return to hand", async () => {
    const testEngine = new TestEngine(
      {
        inkwell: weDontTalkAboutBruno.cost,
        hand: [weDontTalkAboutBruno],
      },
      {
        hand: [aladdinBraveRescuer],
      },
    );

    await testEngine.playCard(weDontTalkAboutBruno);

    expect(testEngine.getCardModel(aladdinBraveRescuer).zone).toBe("hand");
    expect(testEngine.store.stackLayerStore.layers).toHaveLength(0);
  });
});
