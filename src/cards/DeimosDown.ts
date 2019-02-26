
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { SelectPlayer } from "../inputs/SelectPlayer";

export class DeimosDown implements IProjectCard {
    public cost: number = 31;
    public tags: Array<Tags> = [Tags.SPACE];
    public name: string = "Deimos Down";
    public cardType: CardType = CardType.EVENT;
    public text: string = "Raise temperature 3 steps and gain 4 steel. Remove up to 8 plants from any player.";
    public description: string = "We don't use that moon anyway";
    public play(player: Player, game: Game) {
        return new SelectPlayer(this.name, game.getPlayers(), "Select player to remove 8 plants", (foundPlayer: Player) => {
            player.steel += 4;
            foundPlayer.plants = Math.max(0, foundPlayer.plants - 8);
            return game.increaseTemperature(player, 3);
        });
    }
}