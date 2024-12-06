/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  rapunzelsTowerSecludedPrison,
  sugarRushSpeedwayStartingLine,
} from "@lorcanito/lorcana-engine/cards/005/locations/locations";
import { stichtCarefreeSurfer } from "@lorcanito/lorcana-engine/cards/001/characters/characters";

describe("Sugar Rush Speedway - Starting Line", () => {
  it("**ON YOUR MARKS!** Once per turn, you may ↷ chosen character here and deal them 1 damage to move them to another location for free.", () => {
    const testStore = new TestStore({
      inkwell: sugarRushSpeedwayStartingLine.moveCost,
      play: [
        sugarRushSpeedwayStartingLine,
        stichtCarefreeSurfer,
        rapunzelsTowerSecludedPrison,
      ],
    });

    const cardUnderTest = testStore.getCard(sugarRushSpeedwayStartingLine);
    const characterUnderTest = testStore.getCard(stichtCarefreeSurfer);
    const anotherLocation = testStore.getCard(rapunzelsTowerSecludedPrison);

    characterUnderTest.updateCardMeta({ exerted: false, damage: 0 });

    characterUnderTest.enterLocation(cardUnderTest);

    expect(characterUnderTest.meta.exerted).toBe(false);

    cardUnderTest.activate();
    testStore.resolveTopOfStack({ targets: [characterUnderTest] }, true);
    testStore.resolveTopOfStack({ targets: [anotherLocation] });

    expect(characterUnderTest.meta.damage).toBe(1);
    expect(characterUnderTest.meta.exerted).toBe(true);
    expect(characterUnderTest.isAtLocation(anotherLocation)).toBe(true);
  });
});
