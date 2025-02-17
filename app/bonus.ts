import { Combination } from '../interfaces/index';
import { GAME_BOARD_SIZE } from './constants';

export class Bonus {
  extendCombinations(combinations: Combination[]): Combination[] {
    return combinations.map(comb => {
      if (comb.cellIds.length > 4) {
        comb.bonus = true;
        if (comb.type === 'row') {
          comb.cellIds = Array.from({ length: GAME_BOARD_SIZE }, (_, i) => i);
        } else {
          comb.cellIds = Array.from({ length: GAME_BOARD_SIZE }, (_, i) => i);
        }
      }
      return comb;
    });
  }
}
