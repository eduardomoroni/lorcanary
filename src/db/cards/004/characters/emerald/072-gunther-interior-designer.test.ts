/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { guntherInteriorDesigner } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Gunther - Interior Designer", () => {
  it.skip("**SAD-EYED PUPPY** When this character is challenged and banished, each opponent chooses one of their characters and returns that card to their hand.", () => {
    const testStore = new TestStore({
      inkwell: guntherInteriorDesigner.cost,
      play: [guntherInteriorDesigner],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      guntherInteriorDesigner.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
