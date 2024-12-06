/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { potionOfMight } from "@lorcanito/lorcana-engine/cards/005/items/items";

describe("Potion of Might", () => {
  it.skip("**VILE CONCOCTION** 1 ⬡ Banish this item – Chosen character gets +3 ※ this turn. If a Villain character is chosen, they get +4 ※ instead.", () => {
    const testStore = new TestStore({
      inkwell: potionOfMight.cost,
      play: [potionOfMight],
    });

    const cardUnderTest = testStore.getCard(potionOfMight);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
