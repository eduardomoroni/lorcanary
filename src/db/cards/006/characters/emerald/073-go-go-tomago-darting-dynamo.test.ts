/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import {
  baymaxPersonalHealthcareCompanion,
  goGoTomagoDartingDynamo,
} from "@lorcanito/lorcana-engine/cards/006/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";

describe("Go Go Tomago - Darting Dynamo", () => {
  it("**STOP WHINING, WOMAN UP** When you play this character, you may pay 2 ⬡ to gain lore equal to the damage on chosen opposing character.", async () => {
    const testEngine = new TestEngine(
      {
        inkwell: goGoTomagoDartingDynamo.cost + 2,
        hand: [goGoTomagoDartingDynamo],
      },
      {
        play: [baymaxPersonalHealthcareCompanion],
      },
    );

    await testEngine.setCardDamage(baymaxPersonalHealthcareCompanion, 3);

    expect(testEngine.getPlayerLore()).toBe(0);

    await testEngine.playCard(goGoTomagoDartingDynamo);

    await testEngine.resolveOptionalAbility();
    await testEngine.resolveTopOfStack({
      targets: [baymaxPersonalHealthcareCompanion],
    });

    expect(testEngine.getPlayerLore("player_two")).toBe(0);
    expect(testEngine.getPlayerLore("player_one")).toBe(3);
  });
});
