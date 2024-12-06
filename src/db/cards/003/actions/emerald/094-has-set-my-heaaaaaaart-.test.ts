/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { touchedMyHeart } from "@lorcanito/lorcana-engine/cards/003/actions/actions";

describe("Has Set My Heaaaaaaart ...", () => {
  it.skip("Banish chosen item.", () => {
    const testStore = new TestStore({
      inkwell: touchedMyHeart.cost,
      hand: [touchedMyHeart],
    });

    const cardUnderTest = testStore.getCard(touchedMyHeart);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
