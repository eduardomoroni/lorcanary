/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { yzmaConnivingChemist } from "@lorcanito/lorcana-engine/cards/006/characters/characters";
import {
  liloGalacticHero,
  mauiDemiGod,
  stichtNewDog,
} from "@lorcanito/lorcana-engine/cards/001/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { madamMimFox } from "@lorcanito/lorcana-engine/cards/002/characters/characters";
import { madamMimElephant } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Yzma - Conniving Chemist", () => {
  it("**FEEL THE POWER** – _If you have fewer than 3 cards in your hand, draw until you have 3 cards in your hand._", async () => {
    const testEngine = new TestEngine({
      inkwell: yzmaConnivingChemist.cost,
      hand: [yzmaConnivingChemist],
      deck: [
        liloGalacticHero,
        stichtNewDog,
        mauiDemiGod,
        madamMimFox,
        madamMimElephant,
      ],
    });

    const cardUnderTest = testEngine.getCardModel(yzmaConnivingChemist);
    await testEngine.playCard(cardUnderTest);

    expect(testEngine.getZonesCardCount().hand).toBe(0);

    await testEngine.passTurn();

    await testEngine.passTurn();
    await testEngine.activateCard(cardUnderTest);

    expect(testEngine.getZonesCardCount().hand).toBe(3);
  });
});
