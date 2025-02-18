export interface Combination {
  id: number;
  type: 'row' | 'column';
  cellIds: number[];
  bonus: boolean;
  score?: number;
}

export interface LogInfo {
  move: string;
  bonus: string;
  score: number;
}
