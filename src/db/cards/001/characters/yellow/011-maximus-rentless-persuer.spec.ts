/**
 * @jest-environment node
 */
import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";

import {
  maximusRentlessPersuer,
  mickeyMouseTrueFriend,
} from "@lorcanito/lorcana-engine/cards/001/characters/characters";

describe("Maximus Relentless Pursuer!", () => {
  it("HORSE KICK effect - Chosen characters gets -2 ※ this turn.", () => {
    const testStore = new TestStore({
      inkwell: maximusRentlessPersuer.cost,
      hand: [maximusRentlessPersuer],
      play: [mickeyMouseTrueFriend],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "hand",
      maximusRentlessPersuer.id,
    );
    const target = testStore.getByZoneAndId("play", mickeyMouseTrueFriend.id);

    cardUnderTest.playFromHand();
    testStore.resolveTopOfStack({ targetId: target.instanceId });

    expect(target.strength).toEqual((target.lorcanitoCard.strength || 0) - 2);
  });
});
