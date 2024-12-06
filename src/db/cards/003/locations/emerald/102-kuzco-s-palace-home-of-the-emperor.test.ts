/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { kuzcosPalaceHomeOfTheEmperor } from "@lorcanito/lorcana-engine/cards/003/locations/locations";

describe("Kuzco's Palace - Home of the Emperor", () => {
  it.skip("**CITY WALLS** Whenever a character is challenged and banished while here, banish the challenging character.", () => {
    const testStore = new TestStore({
      inkwell: kuzcosPalaceHomeOfTheEmperor.cost,
      play: [kuzcosPalaceHomeOfTheEmperor],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      kuzcosPalaceHomeOfTheEmperor.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
