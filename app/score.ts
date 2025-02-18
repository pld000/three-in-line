import { Combination } from '../interfaces/index';

export class Score {
  constructor() {
  }

  extendCombinations(combinations: Combination[]): Combination[] {
    return combinations.map(comb => ({
      ...comb, score: 10 * 3 + (comb.cellIds.length - 3) * 20
    }));
  }
}
