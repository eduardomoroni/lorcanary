/**
 * @jest-environment node
 */

import { describe, it, expect } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { arielsGrottoASecretPlace } from "@lorcanito/lorcana-engine/cards/004/locations/locations";
import { pawpsicle } from "@lorcanito/lorcana-engine/cards/002/items/items";

describe("Ariel's Grotto - A Secret Place", () => {
  it("(no items) While you have 3 or more items in play, this location gets +2 ◆.", () => {
    const testStore = new TestStore({}, { play: [arielsGrottoASecretPlace] });

    testStore.passTurn();
    testStore.changePlayer("player_two");
    expect(testStore.getPlayerLore("player_two")).toBe(0);
  });
  it("(3 items) While you have 3 or more items in play, this location gets +2 ◆.", () => {
    const testStore = new TestStore(
      {},
      { play: [arielsGrottoASecretPlace, pawpsicle, pawpsicle, pawpsicle] },
    );

    testStore.passTurn();
    testStore.changePlayer("player_two");
    expect(testStore.getPlayerLore("player_two")).toBe(2);
  });
});
