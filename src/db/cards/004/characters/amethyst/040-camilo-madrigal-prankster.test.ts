/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { camiloMadrigalPrankster } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Camilo Madrigal - Prankster", () => {
  it.skip("**MANY FORMS** At the start of your turn, you may chose one:• This character gets +1 ◆ this turn.• This character gain **Challenger** +2 this turn. _(While challenging, this character gets +2 ※.)_", () => {
    const testStore = new TestStore({
      inkwell: camiloMadrigalPrankster.cost,
      play: [camiloMadrigalPrankster],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      camiloMadrigalPrankster.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
