/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { peterPanNeverLandHero } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Peter Pan - Never Land Hero", () => {
  it.skip("**Rush** _(This character can challenge the turn they're played.)_**OVER HERE, TINK** While you have a character named Tinker Bell in play, this character gets +2 ※.", () => {
    const testStore = new TestStore({
      play: [peterPanNeverLandHero],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      peterPanNeverLandHero.id,
    );
    expect(cardUnderTest.hasRush).toBe(true);
  });
});
