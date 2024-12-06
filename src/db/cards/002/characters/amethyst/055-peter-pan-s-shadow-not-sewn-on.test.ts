/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  mulanSoldierInTraining,
  peterPansShadowNotSewnOn,
  queenOfHeartsImpulsiveRuler,
} from "@lorcanito/lorcana-engine/cards/002/characters/characters";

describe("Peter Pan's Shadow - Not Sewn On", () => {
  it("Evasive", () => {
    const testStore = new TestStore({
      play: [peterPansShadowNotSewnOn],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      peterPansShadowNotSewnOn.id,
    );

    expect(cardUnderTest.hasEvasive).toEqual(true);
  });

  it("Rush", () => {
    const testStore = new TestStore({
      play: [peterPansShadowNotSewnOn],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      peterPansShadowNotSewnOn.id,
    );

    expect(cardUnderTest.hasRush).toEqual(true);
  });

  it("**TIPTOE** Your other characters with **Rush** gain **Evasive**.", () => {
    const testStore = new TestStore({
      play: [
        peterPansShadowNotSewnOn,
        mulanSoldierInTraining,
        queenOfHeartsImpulsiveRuler,
      ],
    });

    const target = testStore.getByZoneAndId("play", mulanSoldierInTraining.id);
    const target2 = testStore.getByZoneAndId(
      "play",
      queenOfHeartsImpulsiveRuler.id,
    );

    expect(target2.hasEvasive).toEqual(true);
    expect(target.hasEvasive).toEqual(true);
  });
});
