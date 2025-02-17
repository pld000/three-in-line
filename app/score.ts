import { Combination } from '../interfaces/index';

export class Score {
  private totalScore = 0;
  private Statistic: any;

  calculate(combinations: Combination[]): void {
    combinations.forEach(comb => {
      let points = 10 * 3 + (comb.cellIds.length - 3) * 20;
      this.totalScore += points;
      this.Statistic.write({ move: `Move ${comb.id}`, bonus: comb.bonus ? 'Yes' : 'No', score: points });
    });
  }
}
