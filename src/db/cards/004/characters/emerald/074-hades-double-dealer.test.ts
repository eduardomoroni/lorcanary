/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { hadesDoubleDealer } from "@lorcanito/lorcana-engine/cards/004/characters/characters";
import {
  mickeyBraveLittleTailor,
  mickeyMouseTrueFriend,
} from "@lorcanito/lorcana-engine/cards/001/characters/characters";
import { madamMimFox } from "@lorcanito/lorcana-engine/cards/002/characters/characters";

describe("Hades - Double Dealer", () => {
  it("**GET DOWN TO BUSINESS** ↷,  Banish chosen character of yours - Play another character from your hand with the same name.", () => {
    const testEngine = new TestEngine({
      play: [hadesDoubleDealer, mickeyBraveLittleTailor],
      hand: [mickeyMouseTrueFriend, madamMimFox],
    });

    testEngine.activateCard(hadesDoubleDealer);
    testEngine.resolveTopOfStack({ targets: [mickeyBraveLittleTailor] }, true);
    expect(testEngine.getCardZone(mickeyBraveLittleTailor)).toBe("discard");

    testEngine.resolveTopOfStack({ targets: [mickeyMouseTrueFriend] }, true);
    expect(testEngine.getCardZone(mickeyMouseTrueFriend)).toBe("play");
  });
  it("Cannot play a character with a different name", () => {
    const testEngine = new TestEngine({
      play: [hadesDoubleDealer, mickeyBraveLittleTailor],
      hand: [mickeyMouseTrueFriend, madamMimFox],
    });

    testEngine.activateCard(hadesDoubleDealer);
    testEngine.resolveTopOfStack({ targets: [mickeyBraveLittleTailor] }, true);
    expect(testEngine.getCardZone(mickeyBraveLittleTailor)).toBe("discard");

    testEngine.resolveTopOfStack({ targets: [madamMimFox] }, true);
    expect(testEngine.getCardZone(madamMimFox)).toBe("hand");
  });
});
