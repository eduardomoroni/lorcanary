/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { minnieMouseMusicalArtist } from "@lorcanito/lorcana-engine/cards/003/characters/characters";
import { friendsOnTheOtherSide } from "@lorcanito/lorcana-engine/cards/001/songs/songs";
import { mickeyBraveLittleTailor } from "@lorcanito/lorcana-engine/cards/001/characters/characters";
import {
  donaldDuckMusketeerSoldier,
  goofyMusketeerSwordsman,
} from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Minnie Mouse - Musical Artist", () => {
  it("**Singer** 3 _(This character counts as cost 3 to sing songs.)", async () => {
    const testEngine = new TestEngine({
      inkwell: 2,
      hand: [friendsOnTheOtherSide],
      play: [minnieMouseMusicalArtist],
      deck: [mickeyBraveLittleTailor, mickeyBraveLittleTailor],
    });

    const cardUnderTest = testEngine.getCardModel(minnieMouseMusicalArtist);
    const song = testEngine.getCardModel(friendsOnTheOtherSide);

    expect(cardUnderTest.hasSinger).toBe(true);

    cardUnderTest.sing(song);

    expect(testEngine.getCardZone(song)).toBe("discard");
  });

  it("**ENTOURAGE** Whenever you play a character with **Bodyguard**, you may remove up to 2 damage from chosen character.", async () => {
    const testEngine = new TestEngine({
      inkwell: goofyMusketeerSwordsman.cost,
      play: [minnieMouseMusicalArtist, mickeyBraveLittleTailor],
      hand: [donaldDuckMusketeerSoldier],
    });

    const target = testEngine.getCardModel(mickeyBraveLittleTailor);

    await testEngine.setCardDamage(target, 3);

    await testEngine.playCard(donaldDuckMusketeerSoldier);
    await testEngine.resolveTopOfStack({ targets: [target] }, true); // resolve donald duck ability
    await testEngine.resolveTopOfStack({ targets: [target] }, true); // resolve minnie mouse ability

    expect(target.damage).toBe(1);
  });
});
