/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { mamaOdieMysticalMaven } from "@lorcanito/lorcana-engine/cards/003/characters/characters";
import { mauriceWorldFamousInventor } from "@lorcanito/lorcana-engine/cards/001/characters/characters";
import { iFindEmIFlattenEm } from "@lorcanito/lorcana-engine/cards/004/actions/actions";

describe("Mama Odie - Mystical Maven", () => {
  it("**THIS GOING TO BE GOOD** Whenever you play a song, you may put the top card of your deck into your inkwell facedown and exerted.", () => {
    const testStore = new TestStore({
      inkwell: iFindEmIFlattenEm.cost,
      play: [mamaOdieMysticalMaven],
      hand: [iFindEmIFlattenEm],
      deck: [mauriceWorldFamousInventor],
    });

    const trigger = testStore.getCard(iFindEmIFlattenEm);
    const topDeckCard = testStore.getCard(mauriceWorldFamousInventor);

    trigger.playFromHand();
    testStore.resolveOptionalAbility();
    expect(topDeckCard.zone).toEqual("inkwell");
    expect(topDeckCard.ready).toEqual(false);
  });
});
