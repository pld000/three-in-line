import { Cell } from './cell';
import { CELL_SIZE, GAME_BOARD_SIZE } from './constants';

export class GameBoard {
  draw(state: Cell[][], onCellClick: (cell: Cell) => void): void {
    const board = document.createElement('game-board');
    board.style.margin = '100px auto';
    board.style.display = 'grid';
    board.style.justifyContent = 'center';
    board.style.height = '100%';
    board.style.gridTemplateColumns = `repeat(${GAME_BOARD_SIZE}, ${CELL_SIZE}px)`;

    state.forEach((row) => {
      row.forEach(cell => {
        board.appendChild(cell.createCell(onCellClick));
      });
    });

    const existingBoard = document.querySelector('game-board');
    if (existingBoard) {
      existingBoard.remove();
    }

    document.body.appendChild(board);
  }
}
