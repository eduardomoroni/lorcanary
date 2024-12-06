/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { princePhillipWardenOfTheWoods } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Prince Phillip - Warden of the Woods", () => {
  it.skip("**SHINING BEACON** Your other Hero characters gain **Ward**. _(Opponents can't chose them except to challenge.)_", () => {
    const testStore = new TestStore({
      inkwell: princePhillipWardenOfTheWoods.cost,
      play: [princePhillipWardenOfTheWoods],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      princePhillipWardenOfTheWoods.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
