/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { simbaSonOfMufasa } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Simba - Son of Mufasa", () => {
  it.skip("", () => {
    const testStore = new TestStore({
      inkwell: simbaSonOfMufasa.cost,
      play: [simbaSonOfMufasa],
    });

    const cardUnderTest = testStore.getCard(simbaSonOfMufasa);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });

  it.skip("**FEARSOME ROAR** When you play this character, you may banish chosen item or location.", () => {
    const testStore = new TestStore({
      inkwell: simbaSonOfMufasa.cost,
      hand: [simbaSonOfMufasa],
    });

    const cardUnderTest = testStore.getCard(simbaSonOfMufasa);
    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
