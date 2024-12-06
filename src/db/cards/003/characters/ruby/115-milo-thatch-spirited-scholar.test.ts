/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { miloThatchSpiritedScholar } from "@lorcanito/lorcana-engine/cards/003/characters/characters";
import { forbiddenMountainMaleficentsCastle } from "@lorcanito/lorcana-engine/cards/003/locations/locations";

describe("Milo Thatch - Spirited Scholar", () => {
  it("**I’M YOUR MAN!** While this character is at a location, he gets +2 ※.", () => {
    const testStore = new TestStore({
      inkwell: miloThatchSpiritedScholar.cost,
      play: [miloThatchSpiritedScholar, forbiddenMountainMaleficentsCastle],
    });

    const cardUnderTest = testStore.getCard(miloThatchSpiritedScholar);
    const location = testStore.getCard(forbiddenMountainMaleficentsCastle);

    expect(cardUnderTest.strength).toEqual(miloThatchSpiritedScholar.strength);
    cardUnderTest.enterLocation(location);
    expect(cardUnderTest.strength).toEqual(
      miloThatchSpiritedScholar.strength + 2,
    );
  });
});
