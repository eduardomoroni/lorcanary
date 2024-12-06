/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { princePhillipGallantDefender } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Prince Phillip - Gallant Defender", () => {
  it.skip("**Support** _(Whenever this character quests, you may add their ※ to another chosen character's ※ this turn.)_ **BEST DEFENSE** Whenver one of your characters is chosen for **Support**, they gain **Resist** +1 this turn. _(Damage dealt to them is reduced by 1.)_", () => {
    const testStore = new TestStore({
      play: [princePhillipGallantDefender],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      princePhillipGallantDefender.id,
    );
    expect(cardUnderTest.hasSupport).toBe(true);
  });
});
