/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { hypnoticStrength } from "@lorcanito/lorcana-engine/cards/005/actions/actions";

describe("Hypnotic Strength", () => {
  it.skip("Draw a card. Chosen character gains **Challenger** +2 this turn. _(They get +2 ※ while challenging.)_", () => {
    const testStore = new TestStore({
      inkwell: hypnoticStrength.cost,
      hand: [hypnoticStrength],
    });

    const cardUnderTest = testStore.getCard(hypnoticStrength);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
