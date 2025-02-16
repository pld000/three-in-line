import { Cell } from './cell';
import { Combination } from '../interfaces/index';

export class GameState {
  getInitialState(): Cell[][] {
    return Array.from({ length: 8 }, (_, row) =>
      Array.from({ length: 8 }, (_, col) => new Cell(row * 8 + col, this.randomValue()))
    );
  }

  isTransitionValid(a: Cell, b: Cell): boolean {
    return a.neighbors.includes(b.id);
  }

  getCombinations(state: Cell[][]): Combination[] {
    // Placeholder logic for finding combinations
    return [];
  }

  getNormalizedState(state: Cell[][]): Cell[][] {
    // Placeholder logic for normalizing state after removals
    return state;
  }

  changeCells(a: Cell, b: Cell): void {
    [a.value, b.value] = [b.value, a.value];
  }

  private randomValue(): string {
    return ['A', 'B', 'C', 'D', 'E'][Math.floor(Math.random() * 5)];
  }
}
