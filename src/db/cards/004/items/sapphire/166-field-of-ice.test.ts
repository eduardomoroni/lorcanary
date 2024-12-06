/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { fieldOfIce } from "@lorcanito/lorcana-engine/cards/004/items/items";

describe("Field of Ice", () => {
  it.skip("**ICY DEFENSE** Whenever you play a character, they gain **Resist** +1 until the start of your next turn. _(Damage dealt to them is reduced by 1.)_", () => {
    const testStore = new TestStore({
      inkwell: fieldOfIce.cost,
      play: [fieldOfIce],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", fieldOfIce.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
