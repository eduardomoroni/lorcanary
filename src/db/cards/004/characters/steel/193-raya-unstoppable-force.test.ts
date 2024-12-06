/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { rayaUnstoppableForce } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Raya - Unstoppable Force", () => {
  it.skip("**Challenger +2** _(While challenging, this character gets +2 ※.)_**Resist +2** _(Damage dealt to this character is reduced by 2.)_**YOU GAVE IT YOUR BEST** During your turn, whenever this character banishes another character in a challenge, you may draw a card.", () => {
    const testStore = new TestStore({
      inkwell: rayaUnstoppableForce.cost,
      play: [rayaUnstoppableForce],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      rayaUnstoppableForce.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
