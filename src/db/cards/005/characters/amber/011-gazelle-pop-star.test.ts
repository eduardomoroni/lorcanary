/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { gazellePopStar } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Gazelle - Pop Star", () => {
  it.skip("", () => {
    const testStore = new TestStore({
      inkwell: gazellePopStar.cost,
      play: [gazellePopStar],
    });

    const cardUnderTest = testStore.getCard(gazellePopStar);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
