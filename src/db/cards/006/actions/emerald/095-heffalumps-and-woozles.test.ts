/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { heffalumpsAndWoozles } from "@lorcanito/lorcana-engine/cards/006/actions/actions";
import { tipoGrowingSon } from "@lorcanito/lorcana-engine/cards/005/characters/characters";
import {
  cogsworthGrandfatherClock,
  hiramFlavershamToymaker
} from "@lorcanito/lorcana-engine/cards/002/characters/characters";
import { liloMakingAWish, megaraPullingTheStrings } from "@lorcanito/lorcana-engine/cards/001/characters/characters";

describe("Heffalumps And Woozles", () => {
  it("(A character with cost 2 or more can ↷ to sing this song for free.)", async () => {
    const testEngine = new TestEngine({
      inkwell: heffalumpsAndWoozles.cost,
      hand: [heffalumpsAndWoozles],
      deck: [hiramFlavershamToymaker],
    },
    { play: [tipoGrowingSon] }
    );

    await testEngine.playCard(heffalumpsAndWoozles);

    const target = testEngine.getCardModel(tipoGrowingSon);

    expect(testEngine.stackLayers).toHaveLength(1);
    await testEngine.resolveTopOfStack({ targets: [target] });
    expect(testEngine.stackLayers).toHaveLength(0);
    expect(testEngine.getZonesCardCount().hand).toEqual(1);
  });

  it("NO OPPOSING CHARACTER IN PLAY - Chosen opposing character can't quest during their next turn. Draw a card.", async () => {
    const testEngine = new TestEngine({
      inkwell: heffalumpsAndWoozles.cost,
      hand: [heffalumpsAndWoozles],
      deck: [tipoGrowingSon]
    });

    await testEngine.playCard(heffalumpsAndWoozles);
    expect(testEngine.stackLayers).toHaveLength(0);
    expect(testEngine.getZonesCardCount().hand).toEqual(1);
  });

  it("WARDED OPPOSING CHARACTER IN PLAY - Chosen opposing character can't quest during their next turn. Draw a card.", async () => {
    const testEngine = new TestEngine(
      {
        inkwell: heffalumpsAndWoozles.cost,
        hand: [heffalumpsAndWoozles],
        deck: [tipoGrowingSon],
      },
      { play: [cogsworthGrandfatherClock] },
    );

    await testEngine.playCard(heffalumpsAndWoozles);
    expect(testEngine.stackLayers).toHaveLength(0);
    expect(testEngine.getZonesCardCount().hand).toEqual(1);
  });
});
