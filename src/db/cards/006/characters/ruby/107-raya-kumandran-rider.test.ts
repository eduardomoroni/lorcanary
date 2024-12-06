/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { rayaKumandranRider } from "@lorcanito/lorcana-engine/cards/006/characters/characters";

describe("Raya - Kumandran Rider", () => {
  it.skip("COME ON, LET'S DO THIS Once during your turn, whenever a card is put into your inkwell, you may ready another chosen character of yours. They can't quest for the rest of this turn.", async () => {
    const testEngine = new TestEngine({
      inkwell: rayaKumandranRider.cost,
      play: [rayaKumandranRider],
      hand: [rayaKumandranRider],
    });

    await testEngine.playCard(rayaKumandranRider);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({});
  });
});
