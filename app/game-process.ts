import { GameBoard } from './game-board';
import { GameState } from './game-state';
import { Cell } from './cell';
import { Bonus } from './bonus';
import { Score } from './score';
import { Statistic } from './statistic';

export class GameProcess {
  public state: Cell[][] = [];
  private selectedCell: Cell | null = null;

  private gameBoard = new GameBoard();
  private gameState = new GameState();
  private bonus = new Bonus();
  private score = new Score();
  private statistic = new Statistic();

  startGame(): void {
    this.statistic.init();
    this.state = this.gameState.getInitialState();
    this.gameBoard.draw(this.state, this.handleCellClick.bind(this));
  }

  handleCellClick(cell: Cell): void {
    if (!this.selectedCell || !this.gameState.isTransitionValid(this.selectedCell, cell)) {
      this.selectedCell = cell;
      return;
    }

    this.gameState.changeCells(this.selectedCell, cell);
    let combinations = this.gameState.getCombinations(this.state, cell);

    combinations = this.bonus.extendCombinations(combinations);
    combinations = this.score.extendCombinations(combinations);
    this.statistic.write(combinations);
    this.statistic.updateScore();
    this.statistic.updateScoreStatistic();
    this.state = this.gameState.updateState(this.state, combinations);
    this.gameBoard.draw(this.state, this.handleCellClick.bind(this));

    this.selectedCell = null;
  }
}
