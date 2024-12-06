/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { medallionWeights } from "@lorcanito/lorcana-engine/cards/004/items/items";
import { mulanImperialSoldier } from "@lorcanito/lorcana-engine/cards/001/characters/characters";
import { scuttleExpertOnHumans } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Medallion Weights", () => {
  it("**DISCIPLINE AND STRENGTH** ↷, 2 ⬡ - Chosen character gets +2 ※ this turn. Whenever they challenge another character this turn, you may draw a card.", () => {
    const testStore = new TestStore(
      {
        inkwell: medallionWeights.cost + 2,
        play: [medallionWeights, mulanImperialSoldier],
        deck: 1,
      },
      {
        play: [scuttleExpertOnHumans],
      },
    );

    const cardUnderTest = testStore.getCard(medallionWeights);
    const target = testStore.getCard(mulanImperialSoldier);
    const opponent = testStore.getCard(scuttleExpertOnHumans);

    opponent.updateCardMeta({ exerted: true });

    const initialStrength = target.strength;
    const initialHandSize = testStore.getZonesCardCount().hand;

    cardUnderTest.activate();
    testStore.resolveTopOfStack({ targets: [target] });

    expect(target.strength).toBe(initialStrength + 2);

    // Simulate a challenge with Scuttle as the opponent
    target.challenge(opponent);
    testStore.resolveOptionalAbility();

    expect(testStore.getZonesCardCount().hand).toBe(initialHandSize + 1);

    testStore.passTurn();

    expect(target.strength).toBe(initialStrength);
  });
});
