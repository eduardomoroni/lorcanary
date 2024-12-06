/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { magicaDeSpellThievingSorceress } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Magica De Spell - Thieving Sorceress", () => {
  it.skip("**TELEKINESIS** ↷ – Return chosen item with cost equal to or less than this character's ※ to its player's hand.", () => {
    const testStore = new TestStore({
      inkwell: magicaDeSpellThievingSorceress.cost,
      play: [magicaDeSpellThievingSorceress],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      magicaDeSpellThievingSorceress.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
