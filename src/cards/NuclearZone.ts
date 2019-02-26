
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { SelectSpace } from "../inputs/SelectSpace";
import { TileType } from "../TileType";
import { ISpace } from "../ISpace";

export class NuclearZone implements IProjectCard {
    public cost: number = 10;
    public tags: Array<Tags> = [Tags.EARTH];
    public name: string = "Nuclear Zone";
    public cardType: CardType = CardType.AUTOMATED;
    public text: string = "Place a special tile and raise temperature 2 steps. Lose 2 victory points.";
    public description: string = "Detonating obsolete nuclear weapons from Earth is an efficient method for raising the temperature.";
    public play(player: Player, game: Game) {
        return new SelectSpace(this.name, "Select space for special tile", game.getAvailableSpacesOnLand(player), (foundSpace: ISpace) => {
            game.addTile(player, foundSpace.spaceType, foundSpace, { tileType: TileType.SPECIAL });
            player.victoryPoints -= 2;
            return game.increaseTemperature(player, 2);
        });
    }
}