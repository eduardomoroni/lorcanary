/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { mulanInjuredSoldier } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Mulan - Injured Soldier", () => {
  it("**BLESSURE AU COMBAT** This character enters play with 2 damage.", () => {
    const testStore = new TestStore({
      inkwell: mulanInjuredSoldier.cost,
      hand: [mulanInjuredSoldier],
    });

    const cardUnderTest = testStore.getCard(mulanInjuredSoldier);

    cardUnderTest.playFromHand();

    expect(cardUnderTest.damage).toEqual(2);
  });
});
