/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  daisyDuckDonaldsDate,
  princeNaveenUkulelePlayer,
  vanellopeVonSchweetzSugarRushChamp,
  vanellopeVonSchweetzSugarRushPrincess,
} from "@lorcanito/lorcana-engine/cards/005/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";

describe("Vanellope von Schweetz - Sugar Rush Princess", () => {
  it("Shift", async () => {
    const testEngine = new TestEngine({
      inkwell: 2,
      hand: [vanellopeVonSchweetzSugarRushPrincess],
      play: [vanellopeVonSchweetzSugarRushChamp],
    });

    await testEngine.shiftCard({
      shifted: vanellopeVonSchweetzSugarRushChamp,
      shifter: vanellopeVonSchweetzSugarRushPrincess,
    });
    expect(
      testEngine.getCardModel(vanellopeVonSchweetzSugarRushChamp).zone,
    ).toBe("play");
  });

  it("**I HEARBY DECREE** Whenever you play another Princess character, all opposing characters get -1 ※ until the start of your next turn.", () => {
    const testStore = new TestStore(
      {
        inkwell: vanellopeVonSchweetzSugarRushChamp.cost,
        hand: [vanellopeVonSchweetzSugarRushChamp],
        play: [vanellopeVonSchweetzSugarRushPrincess],
      },
      {
        play: [daisyDuckDonaldsDate, princeNaveenUkulelePlayer],
      },
    );

    const trigger = testStore.getCard(vanellopeVonSchweetzSugarRushChamp);
    const target1 = testStore.getCard(daisyDuckDonaldsDate);
    const target2 = testStore.getCard(princeNaveenUkulelePlayer);

    trigger.playFromHand();
    testStore.resolveTopOfStack({});
    expect(target1.strength).toBe(daisyDuckDonaldsDate.strength - 1);
    expect(target2.strength).toBe(princeNaveenUkulelePlayer.strength - 1);

    testStore.passTurn();
    testStore.passTurn();

    expect(target1.strength).toBe(daisyDuckDonaldsDate.strength);
    expect(target2.strength).toBe(princeNaveenUkulelePlayer.strength);
  });
});
