/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { olympusWouldBeThatWay } from "@lorcanito/lorcana-engine/cards/003/actions/actions";

describe("Olympus Would Be That Way", () => {
  it.skip("Your characters get +3 ※ this turn while challenging a location.", () => {
    const testStore = new TestStore({
      inkwell: olympusWouldBeThatWay.cost,
      hand: [olympusWouldBeThatWay],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "hand",
      olympusWouldBeThatWay.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
