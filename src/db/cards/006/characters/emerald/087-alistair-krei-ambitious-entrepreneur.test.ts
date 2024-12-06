/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { alistairKreiAmbitiousEntrepreneur } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Alistair Krei - Ambitious Entrepreneur", () => {
  it.skip("AN EYE FOR TECH When you play this character, if an opponent has an item in play, gain 1 lore.", async () => {
    const testEngine = new TestEngine({
      inkwell: alistairKreiAmbitiousEntrepreneur.cost,
      hand: [alistairKreiAmbitiousEntrepreneur],
    });

    await testEngine.playCard(alistairKreiAmbitiousEntrepreneur);
    await testEngine.acceptOptionalLayer();
    await testEngine.resolveTopOfStack({});
  });
});
