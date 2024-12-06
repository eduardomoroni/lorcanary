/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  lyleTiberiusRourkeCunningMercenary,
  madameMedusaTheBoss,
} from "@lorcanito/lorcana-engine/cards/003/characters/characters";
import { liloMakingAWish } from "@lorcanito/lorcana-engine/cards/001/characters/characters";
import { dragonFire } from "@lorcanito/lorcana-engine/cards/001/actions/actions";

describe("Lyle Tiberius Rourke - Cunning Mercenary", () => {
  it("**WELL, NOW YOU KNOW** When you play this character, chosen opposing character gains **Reckless** during their next turn. _(They can’t quest and must challenge if able.)", () => {
    const testStore = new TestStore(
      {
        inkwell: lyleTiberiusRourkeCunningMercenary.cost,
        hand: [lyleTiberiusRourkeCunningMercenary],
      },
      {
        play: [liloMakingAWish],
      },
    );

    const cardUnderTest = testStore.getCard(lyleTiberiusRourkeCunningMercenary);
    const target = testStore.getCard(liloMakingAWish);

    cardUnderTest.playFromHand();
    testStore.resolveTopOfStack({ targets: [target] });

    testStore.passTurn();

    expect(target.hasReckless).toEqual(true);
  });

  it("**THANKS FOR VOLUNTEERING** Whenever one of your other characters is banished, each opponent loses 1 lore.", () => {
    const testStore = new TestStore({
      inkwell: dragonFire.cost,
      hand: [dragonFire],
      play: [lyleTiberiusRourkeCunningMercenary, liloMakingAWish],
    });

    testStore.store.tableStore.getTable("player_two").lore = 5;

    const target = testStore.getCard(liloMakingAWish);
    const banisher = testStore.getCard(dragonFire);

    banisher.playFromHand();
    testStore.resolveTopOfStack({ targets: [target] });
    expect(target.zone).toBe("discard");
    expect(testStore.store.tableStore.getTable("player_two").lore).toBe(4);
  });

  it("**THANKS FOR VOLUNTEERING** Whenever one of your other characters is banished, each opponent loses 1 lore. (Should no trigger on self)", () => {
    const testStore = new TestStore({
      inkwell: dragonFire.cost,
      hand: [dragonFire],
      play: [lyleTiberiusRourkeCunningMercenary],
    });

    testStore.store.tableStore.getTable("player_two").lore = 5;

    const target = testStore.getCard(lyleTiberiusRourkeCunningMercenary);
    const banisher = testStore.getCard(dragonFire);

    banisher.playFromHand();
    testStore.resolveTopOfStack({ targets: [target] });
    expect(target.zone).toBe("discard");
    expect(testStore.store.tableStore.getTable("player_two").lore).toBe(5);
  });
});
