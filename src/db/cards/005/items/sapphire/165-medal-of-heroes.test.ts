/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { medalOfHeroes } from "@lorcanito/lorcana-engine/cards/005/items/items";

describe("Medal of Heroes", () => {
  it.skip("**CONGRATULATIONS, SOLDIER**↷, 2 ⬡, Banish this item − Chosen character of yours gets +2 ◆ this turn.", () => {
    const testStore = new TestStore({
      inkwell: medalOfHeroes.cost,
      play: [medalOfHeroes],
    });

    const cardUnderTest = testStore.getCard(medalOfHeroes);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
