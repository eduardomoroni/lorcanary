/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { captainHooksRapier } from "@lorcanito/lorcana-engine/cards/003/items/items";

describe("Captain Hook’s Rapier", () => {
  it.skip("**GET THOSE SCURVY BRATS!** During your turn, whenever one of your characters banishes another character in a challenge, you may pay 1 ⬡ to draw a card.**LET’S HAVE AT IT!</** Your characters named Captain Hook gain **Challenger** +1. _(They get +1 ※ while challenging.)_", () => {
    const testStore = new TestStore({
      inkwell: captainHooksRapier.cost,
      play: [captainHooksRapier],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      captainHooksRapier.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
