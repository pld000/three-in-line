import { Combination, LogInfo } from '../interfaces/index';

export class Statistic {
  public totalScore = 0;
  private logs: LogInfo[] = [];

  init() {
    this.createScoreLabel();
    this.createScoreStatistic();
  }

  write(combinations: Combination[]): void {
    combinations.forEach(comb => {
      this.logs.push(this.mapCombinationToLogInfo(comb));
      this.totalScore += comb.score!;
    });
  }

  private mapCombinationToLogInfo({ id, type, bonus, score }: Combination): LogInfo {
    return <LogInfo>{
      move: `Move: ${type} - ${id}`,
      bonus: bonus ? `Bonus Move!!!'}` : '',
      score
    };
  }

  createScoreLabel(): void {
    const scoreLabel = document.createElement('score-label');
    scoreLabel.style.display = 'block';
    scoreLabel.style.fontSize = `40px`;
    scoreLabel.style.fontWeight = 'bold';
    scoreLabel.innerHTML = `Score: ${this.totalScore}`;
    document.body.appendChild(scoreLabel);
  }

  createScoreStatistic(): void {
    const scoreStatistic = document.createElement('score-statistic');
    scoreStatistic.style.display = 'block';
    scoreStatistic.innerHTML = `<div style="font-size: 30px; font-weight: bold">Statistics:<div>`;
    document.body.appendChild(scoreStatistic);
  }

  updateScore(): void {
    const scoreLabel = document.querySelector('score-label');
    scoreLabel!.innerHTML = `Score: ${this.totalScore}`;
  }
}
