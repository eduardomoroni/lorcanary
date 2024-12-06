/**
 * @jest-environment node
 */

import { describe, it, expect } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { fallingDownTheRabbitHole } from "@lorcanito/lorcana-engine/cards/002/actions/actions";
import {
  herculesHeroInTraining,
  pachaVillageLeader,
} from "@lorcanito/lorcana-engine/cards/002/characters/characters";

describe("Falling Down the Rabbit Hole", () => {
  it("Each player chooses one of their characters and puts them into their inkwell facedown and exerted.", () => {
    const testStore = new TestStore(
      {
        inkwell: fallingDownTheRabbitHole.cost,
        hand: [fallingDownTheRabbitHole],
        play: [pachaVillageLeader],
      },
      {
        play: [herculesHeroInTraining],
      },
    );

    const cardUnderTest = testStore.getByZoneAndId(
      "hand",
      fallingDownTheRabbitHole.id,
    );
    const target = testStore.getByZoneAndId("play", pachaVillageLeader.id);
    const opponentTarget = testStore.getByZoneAndId(
      "play",
      herculesHeroInTraining.id,
      "player_two",
    );

    cardUnderTest.playFromHand();

    testStore.changePlayer("player_two");

    testStore.resolveTopOfStack({ targets: [opponentTarget] }, true);
    expect(testStore.stackLayers).toHaveLength(1);
    expect(opponentTarget.zone).toEqual("inkwell");
    expect(opponentTarget.ready).toEqual(false);

    testStore.changePlayer("player_one");

    testStore.resolveTopOfStack({ targets: [target] });
    expect(testStore.stackLayers).toHaveLength(0);
    expect(target.zone).toEqual("inkwell");
    expect(target.ready).toEqual(false);
  });
});
