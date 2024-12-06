/**
 * @jest-environment node
 */

import { describe, it, expect } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { goofyKnightForADay } from "@lorcanito/lorcana-engine/cards/002/characters/characters";
import { galacticCouncilChamber } from "@lorcanito/lorcana-engine/cards/006/locations/locations";
import { stitchAlienBuccaneer } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Galactic Council Chamber - Courtroom", () => {
  it("**FEDERATION DECREE** While you have an Alien or Robot character here, this location can’t be challenged.", async () => {
    const testEngine = new TestEngine(
      {
        inkwell: galacticCouncilChamber.moveCost,
        play: [galacticCouncilChamber, stitchAlienBuccaneer],
      },
      {
        play: [goofyKnightForADay],
        deck: 2,
      },
    );
    const cardUnderTest = testEngine.getCardModel(galacticCouncilChamber);
    const challenger = testEngine.getCardModel(goofyKnightForADay);

    expect(cardUnderTest.canBeChallenged(challenger)).toEqual(true);

    await testEngine.moveToLocation({
      location: galacticCouncilChamber,
      character: stitchAlienBuccaneer,
    });

    expect(cardUnderTest.canBeChallenged(challenger)).toEqual(false);
    expect(challenger.canChallenge(cardUnderTest)).toEqual(false);

    await testEngine.passTurn("player_one");

    expect(challenger.canChallenge(cardUnderTest)).toEqual(false);
  });
});
