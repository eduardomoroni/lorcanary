/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { sisuEmboldenedWarrior } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Sisu - Emboldened Warrior", () => {
  it("**SURGE OF POWER** This character gets +1 ※ for each card in opponent's hands.", () => {
    const testStore = new TestStore(
      {
        inkwell: sisuEmboldenedWarrior.cost,
        play: [sisuEmboldenedWarrior],
      },
      {
        hand: [
          sisuEmboldenedWarrior,
          sisuEmboldenedWarrior,
          sisuEmboldenedWarrior,
        ],
      },
    );

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      sisuEmboldenedWarrior.id,
    );

    expect(cardUnderTest.strength).toEqual(
      sisuEmboldenedWarrior.strength +
        testStore.getZonesCardCount("player_two").hand,
    );
  });
});
