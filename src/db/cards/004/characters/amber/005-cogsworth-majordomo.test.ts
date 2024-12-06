/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { cogsworthMajordomo } from "@lorcanito/lorcana-engine/cards/004/characters/characters";
import { tamatoaSoShiny } from "@lorcanito/lorcana-engine/cards/001/characters/characters";

describe("Cogsworth - Majordomo", () => {
  it("AS YOU WERE! Whenever this character quests, you may give chosen character -2 ※ until the start of your next turn.", async () => {
    const testEngine = new TestEngine(
      {
        play: [cogsworthMajordomo],
      },
      {
        play: [tamatoaSoShiny],
      },
    );

    await testEngine.questCard(cogsworthMajordomo);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack(
      {
        targets: [tamatoaSoShiny],
      },
      true,
    );

    expect(testEngine.getCardModel(tamatoaSoShiny).strength).toBe(3);

    await testEngine.passTurn();

    expect(testEngine.getCardModel(tamatoaSoShiny).strength).toBe(3);

    await testEngine.passTurn();

    expect(testEngine.getCardModel(tamatoaSoShiny).strength).toBe(5);
  });
});
