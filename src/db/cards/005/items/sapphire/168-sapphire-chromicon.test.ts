/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { sapphireChromicon } from "@lorcanito/lorcana-engine/cards/005/items/items";

describe("Sapphire Chromicon", () => {
  it.skip("**POWERING UP** This item enters play exerted.", () => {
    const testStore = new TestStore({
      inkwell: sapphireChromicon.cost,
      play: [sapphireChromicon],
    });

    const cardUnderTest = testStore.getCard(sapphireChromicon);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });

  it.skip("**SAPPHIRE LIGHT** ↷, 2 ⬡, Banish one of your items – Gain 2 lore.", () => {
    const testStore = new TestStore({
      inkwell: sapphireChromicon.cost,
      play: [sapphireChromicon],
    });

    const cardUnderTest = testStore.getCard(sapphireChromicon);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
