/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { hiroHamadaRoboticsProdigy } from "@lorcanito/lorcana-engine/cards/006/characters/characters";
import {
  liloMakingAWish,
  stichtNewDog,
} from "@lorcanito/lorcana-engine/cards/001/characters/characters";
import { luisaMadrigalEntertainingMuscle } from "@lorcanito/lorcana-engine/cards/005/characters/characters";
import { aladdinBraveRescuer } from "@lorcanito/lorcana-engine/cards/004/characters/characters";
import { pawpsicle } from "@lorcanito/lorcana-engine/cards/002/items/items";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";

describe("Hiro Hamada - Robotics Prodigy", () => {
  it("**SWEET TECH**  ↷, 2 ⬡ − Search your deck for an item card or a Robot character card and reveal it to all players. Shuffle your deck and put that card on top of it.", async () => {
    const testEngine = new TestEngine({
      inkwell: 2,
      play: [hiroHamadaRoboticsProdigy],
      deck: [liloMakingAWish, stichtNewDog, pawpsicle, aladdinBraveRescuer],
    });

    const cardUnderTest = testEngine.getCardModel(hiroHamadaRoboticsProdigy);
    const target = testEngine.getCardModel(pawpsicle);
    await testEngine.activateCard(cardUnderTest, { ability: "SWEET TECH" });

    await testEngine.resolveTopOfStack({ targets: [target] });

    await testEngine.passTurn();
    await testEngine.passTurn();

    expect(target.zone).toEqual("hand");
  });
});
