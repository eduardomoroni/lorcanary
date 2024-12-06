/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { elsaStormChaser } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Elsa - Storm Chaser", () => {
  it.skip("**TEMPEST** ↷− Chosen character gains **Challenger** +2 and **Rush** this turn. _(They get +2 ※ while challenging. They can challenge the turn they're played.)_", () => {
    const testStore = new TestStore({
      inkwell: elsaStormChaser.cost,
      play: [elsaStormChaser],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", elsaStormChaser.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
