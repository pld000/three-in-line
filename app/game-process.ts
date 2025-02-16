import { GameBoard } from './game-board';
import { GameState } from './game-state';

export class GameProcess {
  private gameBoard!: GameBoard;
  private gameState!: GameState;

  constructor() {
    this.gameBoard = new GameBoard();
    this.gameState = new GameState();
  }

  startGame(): void {
    this.gameBoard.draw(this.gameState.getInitialState())
  }

  processPlayerAction() {
  }
}
