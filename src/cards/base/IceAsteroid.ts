import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Game} from '../../Game';
import {CardName} from '../../CardName';
import {MAX_OCEAN_TILES, REDS_RULING_POLICY_COST} from '../../constants';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {PlaceOceanTile} from '../../deferredActions/PlaceOceanTile';
import {CardMetadata} from '../CardMetadata';
import {CardRenderer} from '../render/CardRenderer';

export class IceAsteroid implements IProjectCard {
    public cost = 23;
    public tags = [Tags.SPACE];
    public cardType = CardType.EVENT;
    public name = CardName.ICE_ASTEROID;
    public hasRequirements = false;

    public canPlay(player: Player, game: Game): boolean {
      const remainingOceans = MAX_OCEAN_TILES - game.board.getOceansOnBoard();
      const oceansPlaced = Math.min(remainingOceans, 2);

      if (PartyHooks.shouldApplyPolicy(game, PartyName.REDS)) {
        return player.canAfford(player.getCardCost(game, this) + REDS_RULING_POLICY_COST * oceansPlaced, game, false, true);
      }

      return true;
    }

    public play(player: Player, game: Game) {
      game.defer(new PlaceOceanTile(player, game, 'Select space for first ocean'));
      game.defer(new PlaceOceanTile(player, game, 'Select space for second ocean'));
      return undefined;
    }
    public metadata: CardMetadata = {
      cardNumber: '078',
      renderData: CardRenderer.builder((b) => b.oceans(2)),
      description: 'Place 2 ocean tiles.',
    }
}