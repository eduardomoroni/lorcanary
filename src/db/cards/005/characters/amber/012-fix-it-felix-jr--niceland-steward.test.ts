/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { fixitFelixJrNicelandSteward } from "@lorcanito/lorcana-engine/cards/005/characters/characters";
import { theLibraryAGiftForBelle } from "@lorcanito/lorcana-engine/cards/005/locations/locations";

describe("Fix‐It Felix, Jr. - Niceland Steward", () => {
  it("**BUILDING TOGETHER** Your locations get +2 ⛨️️.", () => {
    const testStore = new TestStore({
      inkwell: fixitFelixJrNicelandSteward.cost,
      play: [theLibraryAGiftForBelle, fixitFelixJrNicelandSteward],
    });

    expect(testStore.getCard(theLibraryAGiftForBelle).willpower).toBe(
      theLibraryAGiftForBelle.willpower + 2,
    );
  });
});
