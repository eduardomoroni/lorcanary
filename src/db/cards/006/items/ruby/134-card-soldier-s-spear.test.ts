/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { cardSoldiersSpear } from "@lorcanito/lorcana-engine/cards/006/items/items";

describe("Card Soldier's Spear", () => {
  it.skip("A SUITABLE WEAPON Your damaged characters get +1 {S}.", async () => {
    const testEngine = new TestEngine({
      inkwell: cardSoldiersSpear.cost,
      play: [cardSoldiersSpear],
      hand: [cardSoldiersSpear],
    });

    await testEngine.playCard(cardSoldiersSpear);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
