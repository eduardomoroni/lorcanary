/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { minnieMouseFunkySpelunker } from "@lorcanito/lorcana-engine/cards/003/characters/characters";
import { forbiddenMountainMaleficentsCastle } from "@lorcanito/lorcana-engine/cards/003/locations/locations";

describe("Minnie Mouse - Funky Spelunker", () => {
  it("**JOURNEY** While this character is at a location, she gets +2 ※.", () => {
    const testStore = new TestStore({
      inkwell: forbiddenMountainMaleficentsCastle.moveCost,
      play: [minnieMouseFunkySpelunker, forbiddenMountainMaleficentsCastle],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      minnieMouseFunkySpelunker.id,
    );
    const location = testStore.getByZoneAndId(
      "play",
      forbiddenMountainMaleficentsCastle.id,
    );

    expect(cardUnderTest.strength).toEqual(minnieMouseFunkySpelunker.strength);
    cardUnderTest.enterLocation(location);
    expect(cardUnderTest.strength).toEqual(
      minnieMouseFunkySpelunker.strength + 2,
    );
  });
});
