import { Cell } from './cell';

export class GameBoard {
  draw(state: Cell[][]): void {
    const board = document.createElement('div');
    board.style.margin = '100px auto';

    // Set the grid dimensions based on the state array
    board.style.gridTemplateColumns = `repeat(${state[0].length}, 30px)`;

    // Create cells
    state.forEach(row => {
      row.forEach(cell => {
        const cellElement = document.createElement('div');
        cellElement.style.height = '30px';
        cellElement.style.border = '1px solid black';
        cellElement.style.display = 'flex';
        cellElement.style.alignItems = 'center';
        cellElement.style.justifyContent = 'center';
        cellElement.style.fontSize = '20px';
        cellElement.style.fontWeight = 'bold';
        board.appendChild(cellElement);
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
