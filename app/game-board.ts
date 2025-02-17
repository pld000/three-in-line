import { Cell } from './cell';
import { CELL_SIZE, GAME_BOARD_SIZE } from './constants';

export class GameBoard {
  draw(state: Cell[][], onCellClick: (cell: Cell) => void): void {
    const board = document.createElement('div');
    board.style.margin = '100px auto';
    board.style.display = 'grid';
    board.style.justifyContent = 'center';
    board.style.height = '100%';
    board.style.gridTemplateColumns = `repeat(${GAME_BOARD_SIZE}, ${CELL_SIZE}px)`;

    // Create cells
    state.forEach((row) => {
      row.forEach(cell => {
        board.appendChild(cell.createCell(onCellClick));
      });
    });

    // Clear previous board if exists
    const existingBoard = document.querySelector('body > div');
    if (existingBoard) {
      existingBoard.remove();
    }

    // Append new board
    document.body.appendChild(board);
  }
}
