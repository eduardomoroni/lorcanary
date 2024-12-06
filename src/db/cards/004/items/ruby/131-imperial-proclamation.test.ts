/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { imperialProclamation } from "@lorcanito/lorcana-engine/cards/004/items/items";

describe("Imperial Proclamation", () => {
  it.skip("**CALL TO THE FRONT** Whenever one of your characters challenges another character, you pay 1 ⬡ less for the next character you play this turn.", () => {
    const testStore = new TestStore({
      inkwell: imperialProclamation.cost,
      play: [imperialProclamation],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      imperialProclamation.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
