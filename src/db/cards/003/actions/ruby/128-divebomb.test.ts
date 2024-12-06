/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { divebomb } from "@lorcanito/lorcana-engine/cards/003/actions/actions";

describe("Divebomb", () => {
  it.skip("Banish one of your characters with **Reckless** to banish chosen character with less ※ than that character.", () => {
    const testStore = new TestStore({
      inkwell: divebomb.cost,
      hand: [divebomb],
    });

    const cardUnderTest = testStore.getByZoneAndId("hand", divebomb.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
