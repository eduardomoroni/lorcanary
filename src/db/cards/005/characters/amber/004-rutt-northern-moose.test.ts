/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { ruttNorthernMoose } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Rutt - Northern Moose", () => {
  it.skip("", () => {
    const testStore = new TestStore({
      inkwell: ruttNorthernMoose.cost,
      play: [ruttNorthernMoose],
    });

    const cardUnderTest = testStore.getCard(ruttNorthernMoose);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
