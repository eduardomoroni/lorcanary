/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { tritonYoungPrince } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Triton - Young Prince", () => {
  it.skip("**SUPERIOR SWIMMER** During your turn, this character gains **Evasive**. _(They can challenge characters with Evasive.)_**KEEPER OF ATLANTICA** Whenever one of your locations is banished, you may put that card into your inkwell facedown and exerted.", () => {
    const testStore = new TestStore({
      inkwell: tritonYoungPrince.cost,
      play: [tritonYoungPrince],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      tritonYoungPrince.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
