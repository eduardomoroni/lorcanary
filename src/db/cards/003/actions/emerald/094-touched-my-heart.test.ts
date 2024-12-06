/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { touchedMyHeart } from "@lorcanito/lorcana-engine/cards/003/actions/actions";

describe("Touched My Heart", () => {
  it.skip("_(A character with cost 2 or more can ↷ to sing this song for free.)_Banish chosen item.", () => {
    const testStore = new TestStore({
      inkwell: touchedMyHeart.cost,
      hand: [touchedMyHeart],
    });

    const cardUnderTest = testStore.getByZoneAndId("hand", touchedMyHeart.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
