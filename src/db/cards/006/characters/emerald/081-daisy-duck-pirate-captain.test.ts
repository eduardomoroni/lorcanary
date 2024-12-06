/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import {
  daisyDuckPirateCaptain,
  perilousMazeWateryLabyrinth,
} from "@lorcanito/lorcana-engine/cards/006";
import { pigletPoohPirateCaptain } from "@lorcanito/lorcana-engine/cards/003/characters/characters";
import { diabloDevotedHerald } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Distant Shores", () => {
  it("Whenever one of your Pirate characters quests while at a location, draw a card.", async () => {
    const testEngine = new TestEngine({
      inkwell: daisyDuckPirateCaptain.cost + pigletPoohPirateCaptain.cost + 1,
      play: [
        pigletPoohPirateCaptain,
        daisyDuckPirateCaptain,
        perilousMazeWateryLabyrinth,
      ],
      hand: 0,
      deck: 1,
    });

    const loc = testEngine.getCardModel(perilousMazeWateryLabyrinth);
    const piglet = testEngine.getCardModel(pigletPoohPirateCaptain);

    await testEngine.moveToLocation({
      character: piglet,
      location: loc,
    });

    piglet.quest();

    expect(testEngine.getZonesCardCount().deck).toEqual(0);
    expect(testEngine.getZonesCardCount().hand).toEqual(1);
  });

  it("Questing character is not a pirate", async () => {
    const testEngine = new TestEngine({
      inkwell: daisyDuckPirateCaptain.cost + diabloDevotedHerald.cost + 1,
      play: [
        diabloDevotedHerald,
        daisyDuckPirateCaptain,
        perilousMazeWateryLabyrinth,
      ],
      hand: 0,
      deck: 1,
    });

    const loc = testEngine.getCardModel(perilousMazeWateryLabyrinth);
    const diablo = testEngine.getCardModel(diabloDevotedHerald);

    await testEngine.moveToLocation({
      character: diablo,
      location: loc,
    });

    diablo.quest();

    expect(testEngine.getZonesCardCount().deck).toEqual(1);
    expect(testEngine.getZonesCardCount().hand).toEqual(0);
  });
});
