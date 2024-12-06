/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { tadashiHamadaGiftedRoboticist } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Tadashi Hamada - Gifted Roboticist", () => {
  it.skip("SOMEONE HAS TO HELP During an opponent’s turn, when this character is banished, you may put the top card of your deck into your inkwell facedown. Then, put this card into your inkwell facedown.", async () => {
    const testEngine = new TestEngine({
      inkwell: tadashiHamadaGiftedRoboticist.cost,
      play: [tadashiHamadaGiftedRoboticist],
      hand: [tadashiHamadaGiftedRoboticist],
    });

    await testEngine.playCard(tadashiHamadaGiftedRoboticist);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
