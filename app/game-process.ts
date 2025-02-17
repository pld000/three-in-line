import { GameBoard } from './game-board';
import { GameState } from './game-state';
import { Cell } from './cell';
import { Bonus } from './bonus';
import { Score } from './score';

export class GameProcess {
  private gameBoard!: GameBoard;
  private gameState!: GameState;
  private bonus = new Bonus();
  private score = new Score();
  private selectedCell: Cell | null = null;
  public state: Cell[][] = [];

  constructor() {
    this.gameBoard = new GameBoard();
    this.gameState = new GameState();
  }

  startGame(): void {
    this.state = this.gameState.getInitialState();
    this.gameBoard.draw(this.state, this.handleCellClick.bind(this));
  }

  handleCellClick(cell: Cell): void {
    if (!this.selectedCell) {
      this.selectedCell = cell;
      return;
    }

    if (this.gameState.isTransitionValid(this.selectedCell, cell)) {
      this.gameState.changeCells(this.selectedCell, cell);
      let combinations = this.gameState.getCombinations(this.state, cell);
      combinations = this.bonus.extendCombinations(combinations);
      console.log(combinations);
      // this.score.calculate(combinations);
      // this.state = this.gameState.getNormalizedState(this.state);
      // this.gameBoard.draw(this.state, this.handleCellClick.bind(this));
      //
      // this.selectedCell = null;
    }

    this.selectedCell = cell;
  }
}
