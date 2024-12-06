/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { snowWhiteFairhearted } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Snow White - Fair-Hearted", () => {
  it.skip("**NATURAL LEADER** This character gains **Resist** +1 for each other Knight character you have in play. _(Damage dealt to this character is reduced by 1 for each other Knight.)_", () => {
    const testStore = new TestStore({
      inkwell: snowWhiteFairhearted.cost,
      play: [snowWhiteFairhearted],
    });

    const cardUnderTest = testStore.getCard(snowWhiteFairhearted);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
