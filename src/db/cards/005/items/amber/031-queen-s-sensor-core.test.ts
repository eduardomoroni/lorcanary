/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { queensSensorCoreItem } from "@lorcanito/lorcana-engine/cards/005/items/items";

describe("Queen's Sensor Core", () => {
  it.skip("SYMBOL OF NOBILITY", () => {
    const testStore = new TestStore({
      inkwell: queensSensorCoreItem.cost,
      play: [queensSensorCoreItem],
    });

    const cardUnderTest = testStore.getCard(queensSensorCoreItem);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });

  it.skip("Royal Search", () => {
    const testStore = new TestStore({
      inkwell: queensSensorCoreItem.cost,
      play: [queensSensorCoreItem],
    });

    const cardUnderTest = testStore.getCard(queensSensorCoreItem);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
