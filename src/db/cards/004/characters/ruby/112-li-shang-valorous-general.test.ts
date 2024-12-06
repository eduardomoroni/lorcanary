/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  argesTheCyclops,
  arielSonicWarrior,
  liShangValorousGeneral,
  sisuEmpoweredSibling,
} from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Li Shang - Valorous General", () => {
  it("has Shift ability", () => {
    const testStore = new TestStore({
      play: [liShangValorousGeneral, sisuEmpoweredSibling, argesTheCyclops],
    });

    const cardUnderTest = testStore.getCard(liShangValorousGeneral);
    expect(cardUnderTest.hasShift).toBe(true);
  });

  it("LEAD THE CHARGE: Your characters with 4 ※ or more get +1 ◆", () => {
    const testStore = new TestStore({
      play: [
        liShangValorousGeneral,
        argesTheCyclops,
        sisuEmpoweredSibling,
        arielSonicWarrior,
      ],
    });

    const strong1 = testStore.getCard(argesTheCyclops);
    const strong2 = testStore.getCard(sisuEmpoweredSibling);
    const weak = testStore.getCard(arielSonicWarrior);

    expect(strong1.lore).toBe(argesTheCyclops.lore + 1);
    expect(strong2.lore).toBe(sisuEmpoweredSibling.lore + 1);
    expect(weak.lore).toBe(arielSonicWarrior.lore);
  });
});
