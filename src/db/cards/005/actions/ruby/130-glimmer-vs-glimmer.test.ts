/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { glimmerVsGlimmer } from "@lorcanito/lorcana-engine/cards/005/actions/actions";

describe("Glimmer VS Glimmer", () => {
  it.skip("Banish chosen character of yours to banish chosen character.", () => {
    const testStore = new TestStore({
      inkwell: glimmerVsGlimmer.cost,
      hand: [glimmerVsGlimmer],
    });

    const cardUnderTest = testStore.getCard(glimmerVsGlimmer);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
