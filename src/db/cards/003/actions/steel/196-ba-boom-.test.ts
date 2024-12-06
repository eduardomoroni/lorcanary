/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { baBoom } from "@lorcanito/lorcana-engine/cards/003/actions/actions";
import { mrSmeeBumblingMate } from "@lorcanito/lorcana-engine/cards/003/characters/characters";
import { agrabahMarketplace } from "@lorcanito/lorcana-engine/cards/003/locations/locations";

describe("Ba-Boom!", () => {
  it("Deal 2 damage to chosen character.", () => {
    const testStore = new TestStore({
      inkwell: baBoom.cost,
      hand: [baBoom],
      play: [mrSmeeBumblingMate],
    });

    const cardUnderTest = testStore.getByZoneAndId("hand", baBoom.id);
    const target = testStore.getByZoneAndId("play", mrSmeeBumblingMate.id);

    cardUnderTest.playFromHand();
    testStore.resolveTopOfStack({ targets: [target] });

    expect(target.damage).toBe(2);
  });

  it("Deal 2 damage to chosen location.", () => {
    const testStore = new TestStore({
      inkwell: baBoom.cost,
      hand: [baBoom],
      play: [agrabahMarketplace],
    });

    const cardUnderTest = testStore.getByZoneAndId("hand", baBoom.id);
    const target = testStore.getByZoneAndId("play", agrabahMarketplace.id);

    cardUnderTest.playFromHand();
    testStore.resolveTopOfStack({ targets: [target] });

    expect(target.damage).toBe(2);
  });
});
