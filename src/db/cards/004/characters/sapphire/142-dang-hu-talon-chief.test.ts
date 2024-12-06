/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { dangHuTalonChief } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Dang Hu - Talon Chief", () => {
  it.skip("**YOU BETTER TALK FAST** Your other Villain characters gain **Support.** _(Whenever they quest, you mad add their ※ to another chosen character's ※ this turn.)_", () => {
    const testStore = new TestStore({
      inkwell: dangHuTalonChief.cost,
      play: [dangHuTalonChief],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", dangHuTalonChief.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
