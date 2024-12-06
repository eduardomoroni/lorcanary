/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { recordPlayer } from "@lorcanito/lorcana-engine/cards/004/items/items";
import { iFindEmIFlattenEm } from "@lorcanito/lorcana-engine/cards/004/actions/actions";
import {
  gastonArrogantHunter,
  liloMakingAWish,
  stichtNewDog,
} from "@lorcanito/lorcana-engine/cards/001/characters/characters";

describe("Record Player", () => {
  it("**LOOK AT THIS!** Whenever you play a song, chosen character gets -2 ※ until the start of your next turn.", () => {
    const testStore = new TestStore({
      inkwell: iFindEmIFlattenEm.cost,
      hand: [iFindEmIFlattenEm],
      play: [recordPlayer, gastonArrogantHunter],
    });

    const target = testStore.getCard(gastonArrogantHunter);
    const trigger = testStore.getCard(iFindEmIFlattenEm);

    trigger.playFromHand();
    testStore.resolveTopOfStack({ targets: [target] });
    expect(target.strength).toEqual(gastonArrogantHunter.strength - 2);
  });

  it("**HIT PARADE** Your characters named Stitch count as having +1 cost to sing songs.", () => {
    const testStore = new TestStore({
      inkwell: recordPlayer.cost,
      play: [recordPlayer, stichtNewDog, liloMakingAWish],
    });

    const cardUnderTest = testStore.getCard(stichtNewDog);
    const anotherCard = testStore.getCard(liloMakingAWish);

    expect(cardUnderTest.singerCost).toEqual(stichtNewDog.cost + 1);
    expect(cardUnderTest.cost).toEqual(stichtNewDog.cost);
    expect(anotherCard.singerCost).toEqual(liloMakingAWish.cost);
  });
});
