/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { hadesLordOfTheUnderworld } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Hades - Lord of the Underworld", () => {
  it.skip("SOUL COLLECTOR Whenever one of your other characters is banished during the opponent's turn, gain 2 lore.", async () => {
    const testEngine = new TestEngine({
      inkwell: hadesLordOfTheUnderworld.cost,
      play: [hadesLordOfTheUnderworld],
      hand: [hadesLordOfTheUnderworld],
    });

    await testEngine.playCard(hadesLordOfTheUnderworld);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
