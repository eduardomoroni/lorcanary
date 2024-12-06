/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { mirabelMadrigalGiftOfTheFamily } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Mirabel Madrigal - Gift of the Family", () => {
  it.skip("**Support** _(Whenever this character quests, you may add their ※ to another chosen character's ※ this turn.)_", () => {
    const testStore = new TestStore({
      play: [mirabelMadrigalGiftOfTheFamily],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      mirabelMadrigalGiftOfTheFamily.id,
    );
    expect(cardUnderTest.hasSupport).toBe(true);
  });

  it.skip("**SAVING THE MIRACLE** Whenever this character quests, your other Madrigal characters get +1 ◆ this turn.", () => {
    const testStore = new TestStore({
      inkwell: mirabelMadrigalGiftOfTheFamily.cost,
      play: [mirabelMadrigalGiftOfTheFamily],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      mirabelMadrigalGiftOfTheFamily.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
