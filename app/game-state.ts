import { Cell } from './cell';
import { Combination } from '../interfaces/index';
import { BONUS_ACTIVATION_COUNT, GAME_BOARD_SIZE } from './constants';

export class GameState {
  getInitialState(): Cell[][] {
    const state: Cell[][] = Array.from({ length: GAME_BOARD_SIZE }, (_, row) =>
      Array.from({ length: GAME_BOARD_SIZE }, (_, index) => new Cell(index, row, ''))
    );

    for (let row = 0; row < GAME_BOARD_SIZE; row++) {
      for (let col = 0; col < GAME_BOARD_SIZE; col++) {
        let value;
        do {
          value = this.randomValue();
        } while (
          (col >= 2 && state[row][col - 1].value === value && state[row][col - 2].value === value) ||
          (row >= 2 && state[row - 1][col].value === value && state[row - 2][col].value === value)
          );
        state[row][col].value = value;
      }
    }

    return state;
  }

  isTransitionValid(a: Cell, b: Cell): boolean {
    const rowDiff = Math.abs(a.row - b.row);
    const colDiff = Math.abs(a.index - b.index);
    return a.value !== b.value && (rowDiff === 1 && colDiff === 0 || rowDiff === 0 && colDiff === 1);
  }

  getCombinations(state: Cell[][], cells: Cell[]): Combination[] {
    const combinations: Combination[] = [];

    cells.forEach(({ row, index, value }) => {
      const rowCells = state[row];
      let rowMatches = [index];
      for (let i = index - 1; i >= 0 && rowCells[i].value === value; i--) {
        rowMatches.unshift(i);
      }
      for (let i = index + 1; i < GAME_BOARD_SIZE && rowCells[i].value === value; i++) {
        rowMatches.push(i);
      }
      if (rowMatches.length >= 3) {
        combinations
          .push({ id: row, type: 'row', cellIds: rowMatches, bonus: rowMatches.length > BONUS_ACTIVATION_COUNT });
      }

      let colMatches = [row];
      for (let i = row - 1; i >= 0 && state[i][index].value === value; i--) {
        colMatches.unshift(i);
      }
      for (let i = row + 1; i < GAME_BOARD_SIZE && state[i][index].value === value; i++) {
        colMatches.push(i);
      }
      if (colMatches.length >= 3) {
        combinations
          .push({ id: index, type: 'column', cellIds: colMatches, bonus: colMatches.length > BONUS_ACTIVATION_COUNT });
      }
    });

    return combinations;
  }

  updateState(state: Cell[][], combinations: Combination[]): Cell[][] {
    combinations.forEach(({ id, type, cellIds, bonus }) => {
      if (type === 'row') {
        cellIds = bonus
          ? Array.from({ length: GAME_BOARD_SIZE }, (_, i) => i)
          : cellIds;

        for (let row = id; row > 0; row--) {
          cellIds.forEach(ind => {
            state[row][ind].value = state[row - 1][ind].value;
          });
        }

        cellIds.forEach(ind => {
          state[0][ind].value = this.randomValue();
        });
      } else {
        if (bonus) {
          for (let row = 0; row < GAME_BOARD_SIZE; row++) {
            state[row][id].value = this.randomValue();
          }
        } else {
          cellIds.forEach((cellIndex) => {
            for (let r = cellIndex; r > 0; r--) {
              state[r][id].value = state[r - 1][id].value;
            }
            state[0][id].value = this.randomValue();
          });
        }
      }
    });

    return state;
  }

  changeCells(a: Cell, b: Cell): void {
    const tmp = a.value;
    a.value = b.value;
    b.value = tmp;

    a.element.innerHTML = a.value;
    b.element.innerHTML = b.value;

    a.element.setAttribute('cell-value', a.value);
    b.element.setAttribute('cell-value', b.value);
  }

  private randomValue(): string {
    return ['A', 'B', 'C', 'D', 'E'][Math.floor(Math.random() * 5)];
  }
}
