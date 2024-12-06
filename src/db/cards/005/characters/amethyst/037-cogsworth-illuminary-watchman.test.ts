/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { cogsworthIlluminaryWatchman } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Cogsworth - Illuminary Watchman", () => {
  it.skip("**TIME TO MOVE IT!** When you play this character, chosen character gains **Rush** this turn. _(They can challenge the turn they’re played.)_", () => {
    const testStore = new TestStore({
      inkwell: cogsworthIlluminaryWatchman.cost,
      hand: [cogsworthIlluminaryWatchman],
    });

    const cardUnderTest = testStore.getCard(cogsworthIlluminaryWatchman);
    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
