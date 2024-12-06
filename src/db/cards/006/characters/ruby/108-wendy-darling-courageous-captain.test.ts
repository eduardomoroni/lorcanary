/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import {
  heathcliffStoicButler,
  stitchAlienBuccaneer,
  wendyDarlingCourageousCaptain,
} from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Wendy Darling - Courageous Captain", () => {
  it("Evasive (Only characters with Evasive can challenge this character.)", async () => {
    const testEngine = new TestEngine({
      play: [wendyDarlingCourageousCaptain],
    });

    const cardUnderTest = testEngine.getCardModel(
      wendyDarlingCourageousCaptain,
    );
    expect(cardUnderTest.hasEvasive).toBe(true);
  });

  it("LOOK LIVELY, CREW! While you have another Pirate character in play, this character gets +1 {S} and +1 ◆.", async () => {
    const testEngine = new TestEngine({
      inkwell: stitchAlienBuccaneer.cost,
      play: [wendyDarlingCourageousCaptain],
      hand: [stitchAlienBuccaneer],
    });

    const cardUnderTest = testEngine.getCardModel(
      wendyDarlingCourageousCaptain,
    );
    expect(cardUnderTest.lore).toEqual(wendyDarlingCourageousCaptain.lore);
    expect(cardUnderTest.strength).toEqual(
      wendyDarlingCourageousCaptain.strength,
    );

    await testEngine.playCard(stitchAlienBuccaneer);

    expect(cardUnderTest.lore).toEqual(wendyDarlingCourageousCaptain.lore + 1);
    expect(cardUnderTest.strength).toEqual(
      wendyDarlingCourageousCaptain.strength + 1,
    );
  });
});
