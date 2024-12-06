/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { iWillFindMyWay } from "@lorcanito/lorcana-engine/cards/003/actions/actions";

describe("I Will Find My Way", () => {
  it.skip("_(A character with cost 1 or more can ↷ to sing this song for free.)_Chosen character of yours gets +2 ※ this turn. They may move to a location for free.", () => {
    const testStore = new TestStore({
      inkwell: iWillFindMyWay.cost,
      hand: [iWillFindMyWay],
    });

    const cardUnderTest = testStore.getByZoneAndId("hand", iWillFindMyWay.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
