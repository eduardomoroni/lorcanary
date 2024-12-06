/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { motherGothelWitheredAndWicked } from "@lorcanito/lorcana-engine/cards/002/characters/characters";

describe("Mother Gothel - Withered and Wicked", () => {
  it("**WHAT HAVE YOU DONE?!** This character enters play with 3 damage.", () => {
    const testStore = new TestStore({
      inkwell: motherGothelWitheredAndWicked.cost,
      hand: [motherGothelWitheredAndWicked],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "hand",
      motherGothelWitheredAndWicked.id,
    );

    cardUnderTest.playFromHand();

    expect(cardUnderTest.damage).toEqual(3);
  });
});
