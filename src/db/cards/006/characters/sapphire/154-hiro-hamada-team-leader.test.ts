/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  hiroHamadaRoboticsProdigy,
  hiroHamadaTeamLeader,
  wasabiMethodicalEngineer,
} from "@lorcanito/lorcana-engine/cards/006/characters/characters";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import {
  arielSpectacularSinger,
  heiheiBoatSnack,
} from "@lorcanito/lorcana-engine/cards/001/characters/characters";
import { friendsOnTheOtherSide } from "@lorcanito/lorcana-engine/cards/001/songs/songs";

describe("Hiro Hamada - Team Leader", () => {
  it("**I NEED TO UPGRADE ALL OF YOU** Your other Inventor characters gain **Resist** +1. _(Damage dealt to them is reduced by 1.)_**SHAPE THE FUTURE** 2 ⬡ − Look at the top card of your deck. Put it on either the top or the bottom of your deck.", () => {
    const testEngine = new TestEngine({
      play: [
        hiroHamadaTeamLeader,
        hiroHamadaRoboticsProdigy,
        wasabiMethodicalEngineer,
      ],
    });

    const cardUnderTest = testEngine.getCardModel(hiroHamadaTeamLeader);
    const hiroHamadaRoboticsProdigyCard = testEngine.getCardModel(
      hiroHamadaRoboticsProdigy,
    );
    const wasabiMethodicalEngineerCard = testEngine.getCardModel(
      wasabiMethodicalEngineer,
    );

    expect(hiroHamadaRoboticsProdigyCard.hasResist).toBe(true);
    expect(wasabiMethodicalEngineerCard.hasResist).toBe(true);
    expect(cardUnderTest.hasResist).toBe(false);
  });
  it("**SHAPE THE FUTURE** 2 ⬡ − Look at the top card of your deck. Put it on either the top or the bottom of your deck.", async () => {
    const testEngine = new TestEngine({
      inkwell: 2,
      play: [hiroHamadaTeamLeader],
      deck: [heiheiBoatSnack, friendsOnTheOtherSide, arielSpectacularSinger],
    });

    const cardUnderTest = testEngine.getCardModel(hiroHamadaTeamLeader);
    const first = testEngine.getCardModel(arielSpectacularSinger);

    await testEngine.activateCard(cardUnderTest, {
      ability: "SHAPE THE FUTURE",
    });

    await testEngine.resolveTopOfStack({ scry: { top: [first] } });

    await testEngine.passTurn();
    await testEngine.passTurn();

    expect(first.zone).toBe("hand");
  });
});
