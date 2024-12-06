/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { magicCarpetFlyingRug } from "@lorcanito/lorcana-engine/cards/003/characters/characters";
import { rapunzelsTowerSecludedPrison } from "@lorcanito/lorcana-engine/cards/005/locations/locations";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { hiddenCoveTranquilHaven } from "@lorcanito/lorcana-engine/cards/004/locations/locations";
import { taffytaMuttonfudgeSourSpeedster } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Magic Carpet - Flying Rug", () => {
  describe("**FIND THE WAY** ↷ – Move a character of yours to a location for free.", () => {
    it("should move a character to a location for free", async () => {
      const testStore = new TestStore({
        play: [magicCarpetFlyingRug, rapunzelsTowerSecludedPrison],
      });

      const cardUnderTest = testStore.getCard(magicCarpetFlyingRug);
      const locationUnderTest = testStore.getCard(rapunzelsTowerSecludedPrison);

      cardUnderTest.activate();
      testStore.resolveTopOfStack({ targets: [cardUnderTest] }, true);
      testStore.resolveTopOfStack({ targets: [locationUnderTest] });
      expect(cardUnderTest.isAtLocation(locationUnderTest)).toBe(true);
    });

    it("Should trigger enter location triggers", async () => {
      const testEngine = new TestEngine({
        play: [
          hiddenCoveTranquilHaven,
          magicCarpetFlyingRug,
          taffytaMuttonfudgeSourSpeedster,
        ],
      });

      await testEngine.activateCard(magicCarpetFlyingRug);
      await testEngine.resolveTopOfStack(
        { targets: [taffytaMuttonfudgeSourSpeedster] },
        true,
      );
      await testEngine.resolveTopOfStack({
        targets: [hiddenCoveTranquilHaven],
      });

      expect(testEngine.getLoreForPlayer("player_one")).toBe(2);
    });
  });
});
