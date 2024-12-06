/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { oswaldTheLuckyRabbit } from "@lorcanito/lorcana-engine/cards/006/characters/characters";
import { pawpsicle } from "@lorcanito/lorcana-engine/cards/002/items/items";
import { tipoGrowingSon } from "@lorcanito/lorcana-engine/cards/005/characters/characters";
import { hiramFlavershamToymaker } from "@lorcanito/lorcana-engine/cards/002/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";

describe("Oswald - The Lucky Rabbit", () => {
  it("FAVORABLE CHANCE During your turn, whenever a card is put into your inkwell, you may reveal the top card of your deck. If it's an item card, you may play that item for free and they enter play exerted. Otherwise put it on the bottom of your deck.", async () => {
    const testEngine = new TestEngine({
      play: [oswaldTheLuckyRabbit],
      hand: [tipoGrowingSon],
      deck: [pawpsicle, hiramFlavershamToymaker],
    });

    await testEngine.putIntoInkwell(tipoGrowingSon);
    expect(testEngine.getAvailableInkwellCardCount()).toBe(1);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack(
      {
        scry: {
          play: [pawpsicle],
        },
      },
      true,
    );

    expect(testEngine.getZonesCardCount()).toEqual(
      expect.objectContaining({
        deck: 1,
        discard: 0,
        hand: 0,
        play: 2,
        inkwell: 1,
      }),
    );
  });

  it("Draw item but choose not to play", async () => {
    const testEngine = new TestEngine({
      play: [oswaldTheLuckyRabbit],
      hand: [tipoGrowingSon],
      deck: [pawpsicle, hiramFlavershamToymaker],
    });

    const hiram = testEngine.getCardModel(hiramFlavershamToymaker);
    const pawp = testEngine.getCardModel(pawpsicle);

    await testEngine.putIntoInkwell(tipoGrowingSon);
    expect(testEngine.getAvailableInkwellCardCount()).toBe(1);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack(
      {
        scry: {
          bottom: [pawpsicle],
        },
      },
      true,
    );
    await testEngine.drawCard();

    expect(testEngine.getCardZone(hiram)).toBe("hand");
    expect(testEngine.getCardZone(pawp)).toBe("deck");
    expect(testEngine.getZonesCardCount()).toEqual(
      expect.objectContaining({
        deck: 1,
        discard: 0,
        hand: 1,
        play: 1,
        inkwell: 1,
      }),
    );
  });

  it("if NOT an item card then put onto bottom of deck", async () => {
    const testEngine = new TestEngine({
      play: [oswaldTheLuckyRabbit],
      hand: [pawpsicle],
      deck: [tipoGrowingSon, hiramFlavershamToymaker],
    });

    const hiram = testEngine.getCardModel(hiramFlavershamToymaker);
    const tipo = testEngine.getCardModel(tipoGrowingSon);

    await testEngine.putIntoInkwell(pawpsicle);
    expect(testEngine.getAvailableInkwellCardCount()).toBe(1);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack(
      {
        scry: {
          bottom: [tipoGrowingSon],
        },
      },
      true,
    );

    await testEngine.drawCard();

    expect(testEngine.getCardZone(hiram)).toBe("hand");
    expect(testEngine.getCardZone(tipo)).toBe("deck");
    expect(testEngine.getZonesCardCount()).toEqual(
      expect.objectContaining({
        deck: 1,
        discard: 0,
        hand: 1,
        play: 1,
        inkwell: 1,
      }),
    );
  });
});
