/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { clarabelleClumsyGuest } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Clarabelle - Clumsy Guest", () => {
  it.skip("**BUTTERFINGER** When you play this character, you may pay to ⬡ to banish chosen item.", () => {
    const testStore = new TestStore({
      inkwell: clarabelleClumsyGuest.cost,
      hand: [clarabelleClumsyGuest],
    });

    const cardUnderTest = testStore.getCard(clarabelleClumsyGuest);
    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
