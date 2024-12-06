/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { mammaOdieLoneSage } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Mamma Odie - Lone Sage", () => {
  it.skip("I HAVE TO DO EVERYTHING AROUND HERE Whenever you play a song, you may move up to 2 damage counters from chosen character to chosen opposing character.", async () => {
    const testEngine = new TestEngine({
      inkwell: mammaOdieLoneSage.cost,
      play: [mammaOdieLoneSage],
      hand: [mammaOdieLoneSage],
    });

    await testEngine.playCard(mammaOdieLoneSage);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
