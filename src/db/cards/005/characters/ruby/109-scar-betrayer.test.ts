/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  mufasaRulerOfPrideRock,
  scarBetrayer,
} from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Scar - Betrayer", () => {
  it("**LONG LIVE THE KING** When you play this character, you may banish chosen character named Mufasa.", () => {
    const testStore = new TestStore({
      inkwell: scarBetrayer.cost,
      hand: [scarBetrayer],
      play: [mufasaRulerOfPrideRock],
    });

    const cardUnderTest = testStore.getCard(scarBetrayer);
    const mufasa = testStore.getCard(mufasaRulerOfPrideRock);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({ targets: [mufasa] });

    expect(mufasa.zone).toEqual("discard");
  });
});
