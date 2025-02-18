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
      bonus: bonus ? `<span style="color: red">Bonus Move!!!</span>` : '',
      score
    };
  }

  createScoreLabel(): void {
    const scoreLabel = document.createElement('score-label');
    scoreLabel.style.display = 'block';
    scoreLabel.style.fontSize = `40px`;
    scoreLabel.style.fontWeight = 'bold';
    scoreLabel.innerHTML = `Score: ${this.totalScore}`;
    document.querySelector('container')!.appendChild(scoreLabel);
  }

  createScoreStatistic(): void {
    const scoreStatistic = document.createElement('score-statistic');
    scoreStatistic.style.display = 'block';
    scoreStatistic.innerHTML = `<div style="font-size: 30px; font-weight: bold">Statistics:<div>`;
    document.querySelector('container')!.appendChild(scoreStatistic);
  }

  updateScore(): void {
    const scoreLabel = document.querySelector('score-label');
    scoreLabel!.innerHTML = `Score: ${this.totalScore}`;
  }

  updateScoreStatistic(): void {
    if (this.logs.length === 0) {
      return;
    }

    const scoreStatistic = document.querySelector('score-statistic');
    scoreStatistic!.innerHTML = `<div style="font-size: 30px; font-weight: bold">Statistics:<div>`;

    this.logs.forEach(({move, bonus, score}) => {
      const statisticLine = document.createElement('div');
      statisticLine.style.whiteSpace = 'nowrap';
      statisticLine.innerHTML = `${move}${(bonus ? ' - ' + bonus : '')} - ${score}`;

      scoreStatistic!.appendChild(statisticLine);
    });
  }
}
