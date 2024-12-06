/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { thebesTheBigOlive } from "@lorcanito/lorcana-engine/cards/004/locations/locations";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import {
  miloThatchCleverCartographer,
  starkeyDeviousPirate,
} from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Thebes - The Big Olive", () => {
  it("During your turn, whenever a character banishes another character in a challenge while here, you gain 2 lore.", async () => {
    const testEngine = new TestEngine(
      {
        inkwell: thebesTheBigOlive.moveCost,
        play: [starkeyDeviousPirate, thebesTheBigOlive],
      },
      {
        play: [miloThatchCleverCartographer],
      },
    );

    await testEngine.moveToLocation({
      location: thebesTheBigOlive,
      character: starkeyDeviousPirate,
    });
    await testEngine.tapCard(miloThatchCleverCartographer);

    expect(testEngine.getLoreForPlayer("player_one")).toBe(0);
    await testEngine.challenge({
      attacker: starkeyDeviousPirate,
      defender: miloThatchCleverCartographer,
    });
    expect(testEngine.getLoreForPlayer("player_one")).toBe(2);
  });

  it("Doesnt trigger when characters are not in the location", async () => {
    const testEngine = new TestEngine(
      {
        play: [starkeyDeviousPirate, thebesTheBigOlive],
      },
      {
        play: [miloThatchCleverCartographer],
      },
    );

    await testEngine.tapCard(miloThatchCleverCartographer);

    expect(testEngine.getLoreForPlayer("player_one")).toBe(0);
    await testEngine.challenge({
      attacker: starkeyDeviousPirate,
      defender: miloThatchCleverCartographer,
    });
    expect(testEngine.getLoreForPlayer("player_one")).toBe(0);
  });
});
