/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { seldomAllTheySeem } from "@lorcanito/lorcana-engine/cards/004/actions/actions";

describe("Seldom All They Seem", () => {
  it.skip("_(A character with cost 2 or more can ↷ to sing this song for free.)_Chosen character gets -3 ※ this turn.", () => {
    const testStore = new TestStore({
      inkwell: seldomAllTheySeem.cost,
      hand: [seldomAllTheySeem],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "hand",
      seldomAllTheySeem.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
