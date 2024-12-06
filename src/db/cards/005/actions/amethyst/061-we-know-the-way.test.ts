/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { weKnowTheWay } from "@lorcanito/lorcana-engine/cards/005/actions/actions";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { rapunzelsTowerSecludedPrison } from "@lorcanito/lorcana-engine/cards/005/locations/locations";

describe("We Know The Way", () => {
  it.failing(
    "Shuffle chosen card from your discard into your deck. Reveal the top card of your deck. If it has the same name as the chosen card, you may play the revealed card for free. Otherwise, put it into your hand.",
    async () => {
      const testEngine = new TestEngine({
        inkwell: weKnowTheWay.cost,
        hand: [weKnowTheWay],
        discard: [rapunzelsTowerSecludedPrison],
      });

      await testEngine.playCard(
        weKnowTheWay,
        { targets: [rapunzelsTowerSecludedPrison] },
        true,
      );

      const target = testEngine.getCardModel(rapunzelsTowerSecludedPrison);
      expect(target.zone).toEqual("deck");

      await testEngine.resolveOptionalAbility();
      expect(target.zone).toEqual("play");
    },
  );
});
