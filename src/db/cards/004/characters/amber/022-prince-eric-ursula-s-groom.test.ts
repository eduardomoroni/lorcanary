/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { princeEricUrsulasGroom } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Prince Eric - Ursula's Groom", () => {
  it.skip("**Shift 4** _(You may pay 4 ⬡ to play this on top of one of your characters named Prince Eric.)****UNDER VANESSA'S SPELL** While you have a character named Ursula in play, this character gains **Bodyguard** and gets +2 ⛨️️. _(An opposing character who challenges one of your characters must choose one with Bodyguard if able.)_", () => {
    const testStore = new TestStore({
      inkwell: princeEricUrsulasGroom.cost,
      play: [princeEricUrsulasGroom],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      princeEricUrsulasGroom.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
