/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { rapunzelsTowerSecludedPrison } from "@lorcanito/lorcana-engine/cards/005/locations/locations";

describe("Rapunzel's Tower - Secluded Prison", () => {
  it.skip("**SAFE AND SOUND** Characters get +3 ⛨️️ while here.", () => {
    const testStore = new TestStore({
      inkwell: rapunzelsTowerSecludedPrison.cost,
      play: [rapunzelsTowerSecludedPrison],
    });

    const cardUnderTest = testStore.getCard(rapunzelsTowerSecludedPrison);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
