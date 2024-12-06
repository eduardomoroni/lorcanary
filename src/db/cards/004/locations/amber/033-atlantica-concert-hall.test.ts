/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { atlanticaConcertHall } from "@lorcanito/lorcana-engine/cards/004/locations/locations";
import { stichtNewDog } from "@lorcanito/lorcana-engine/cards/001/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";

describe("Atlantica - Concert Hall", () => {
  it("Underwater Acoustics - Characters count as having +2 cost to sing songs while here.", async () => {
    const testEngine = new TestEngine({
      inkwell: atlanticaConcertHall.moveCost,
      play: [atlanticaConcertHall, stichtNewDog],
    });

    const { location, character } = await testEngine.moveToLocation({
      character: stichtNewDog,
      location: atlanticaConcertHall,
    });

    expect(character.singerCost).toBe(2 + stichtNewDog.cost);
  });
});
