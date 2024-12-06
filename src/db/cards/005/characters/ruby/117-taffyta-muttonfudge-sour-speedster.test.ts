/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { taffytaMuttonfudgeSourSpeedster } from "@lorcanito/lorcana-engine/cards/005/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { hiddenCoveTranquilHaven } from "@lorcanito/lorcana-engine/cards/004/locations/locations";

describe("Taffyta Muttonfudge - Sour Speedster", () => {
  it("**NEW ROSTER** Once per turn, when this character moves to a location, gain 2 lore.", async () => {
    const testEngine = new TestEngine({
      inkwell: hiddenCoveTranquilHaven.moveCost * 2,
      play: [hiddenCoveTranquilHaven, taffytaMuttonfudgeSourSpeedster],
    });

    await testEngine.moveToLocation({
      location: hiddenCoveTranquilHaven,
      character: taffytaMuttonfudgeSourSpeedster,
    });

    expect(testEngine.getLoreForPlayer("player_one")).toBe(2);
  });
});
