/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { lastDitchEffort } from "@lorcanito/lorcana-engine/cards/003/actions/actions";

describe("Last-Ditch Effort", () => {
  it.skip("Exert chosen opposing character. Then chosen character of yours gains **Challenger** +2 this turn. (They get +2 ※ while challenging.)", () => {
    const testStore = new TestStore({
      inkwell: lastDitchEffort.cost,
      hand: [lastDitchEffort],
    });

    const cardUnderTest = testStore.getByZoneAndId("hand", lastDitchEffort.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
