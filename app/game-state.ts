import { Cell } from './cell';
import { Combination } from '../interfaces/index';
import { GAME_BOARD_SIZE } from './constants';

export class GameState {
  getInitialState(): Cell[][] {
    return Array.from({ length: GAME_BOARD_SIZE }, (_, row) =>
      Array.from({ length: GAME_BOARD_SIZE }, (_, index) => new Cell(index, row, this.randomValue()))
    );
  }

  isTransitionValid(a: Cell, b: Cell): boolean {
    const rowDiff = Math.abs(a.row - b.row);
    const colDiff = Math.abs(a.index - b.index);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  }

  getCombinations(state: Cell[][], { row, index, value }: {
    row: number,
    index: number,
    value: string
  }): Combination[] {
    const combinations: Combination[] = [];

    const rowCells = state[row];
    let rowMatches = [index];
    for (let i = index - 1; i >= 0 && rowCells[i].value === value; i--) {
      rowMatches.unshift(i);
    }
    for (let i = index + 1; i < GAME_BOARD_SIZE && rowCells[i].value === value; i++) {
      rowMatches.push(i);
    }
    if (rowMatches.length >= 3) {
      combinations.push({ id: row, type: 'row', cellIds: rowMatches, bonus: rowMatches.length > 4 });
    }

    let colMatches = [row];
    for (let i = row - 1; i >= 0 && state[i][index].value === value; i--) {
      colMatches.unshift(i);
    }
    for (let i = row + 1; i < GAME_BOARD_SIZE && state[i][index].value === value; i++) {
      colMatches.push(i);
    }
    if (colMatches.length >= 3) {
      combinations.push({ id: index, type: 'column', cellIds: colMatches, bonus: colMatches.length > 4 });
    }

    return combinations;
  }

  updateState(state: Cell[][], combinations: Combination[]): Cell[][] {
    combinations.forEach(({ id, type, cellIds, bonus }) => {
      if (bonus && type === 'column') {
        for (let row = 0; row < GAME_BOARD_SIZE; row++) {
          state[row][id].value = this.randomValue();
        }
      } else {
        cellIds.forEach((cellIndex) => {
          if (type === 'row') {
            for (let r = cellIndex; r > 0; r--) {
              state[id][r].value = state[id][r - 1].value;
            }
            state[id][0].value = this.randomValue();
          } else {
            for (let r = cellIndex; r > 0; r--) {
              state[r][id].value = state[r - 1][id].value;
            }
            state[0][id].value = this.randomValue();
          }
        });
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
