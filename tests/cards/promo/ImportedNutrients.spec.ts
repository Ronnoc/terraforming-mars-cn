import { expect } from "chai";
import { ImportedNutrients } from "../../../src/cards/promo/ImportedNutrients";
import { Ants } from "../../../src/cards/Ants";
import { Color } from "../../../src/Color";
import { Player } from "../../../src/Player";
import { Decomposers } from "../../../src/cards/Decomposers";

describe("ImportedNutrients", function () {
    it("Can play without microbe cards", function () {
        const card = new ImportedNutrients();
        const player = new Player("test", Color.BLUE, false);
        const action = card.play(player);
        expect(player.plants).to.eq(4);
        expect(action).to.eq(undefined); 
    });
    it("Adds microbes automatically if only 1 target", function () {
        const card = new ImportedNutrients();
        const player = new Player("test", Color.BLUE, false);
        const ants = new Ants();
        player.playedCards.push(ants);

        card.play(player);
        expect(player.plants).to.eq(4);
        expect(player.getResourcesOnCard(ants)).to.eq(4);
    });
    it("Can select target if have multiple cards collecting microbes", function () {
        const card = new ImportedNutrients();
        const player = new Player("test", Color.BLUE, false);
        const ants = new Ants();
        const decomposers = new Decomposers();
        player.playedCards.push(ants, decomposers);
        
        const action = card.play(player);
        expect(player.plants).to.eq(4);

        expect(action).not.to.eq(undefined); 
        action!.cb([decomposers]);
        expect(player.getResourcesOnCard(decomposers)).to.eq(4);
    });
});