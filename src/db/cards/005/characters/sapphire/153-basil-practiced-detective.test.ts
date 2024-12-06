/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { basilPracticedDetective } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Basil - Practiced Detective", () => {
  it.skip("", () => {
    const testStore = new TestStore({
      inkwell: basilPracticedDetective.cost,
      play: [basilPracticedDetective],
    });

    const cardUnderTest = testStore.getCard(basilPracticedDetective);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
