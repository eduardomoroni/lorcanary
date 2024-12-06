/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { rubyChromicon } from "@lorcanito/lorcana-engine/cards/005/items/items";

describe("Ruby Chromicon", () => {
  it.skip("**RUBY LIGHT** ↷ − Chosen character gets +1 ※ this turn.", () => {
    const testStore = new TestStore({
      inkwell: rubyChromicon.cost,
      play: [rubyChromicon],
    });

    const cardUnderTest = testStore.getCard(rubyChromicon);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
