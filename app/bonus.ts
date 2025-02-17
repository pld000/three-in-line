import { Combination } from '../interfaces/index';
import { GAME_BOARD_SIZE } from './constants';

export class Bonus {
  extendCombinations(combinations: Combination[]): Combination[] {

    return combinations.map(comb => comb.cellIds.length > 3
      ? {
        ...comb,
        bonus: true,
        cellIds: comb.type === 'row'
          ? Array.from({ length: GAME_BOARD_SIZE }, (_, i) => i)
          : Array.from({ length: GAME_BOARD_SIZE }, (_, i) => i)
      }
      : comb
    );
  }
}
