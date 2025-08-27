export type CellType = '' | 'O' | 'X';

export type GameStatus = 'in_progress' | 'tie' | 'win';

export type Results = {
  O: number;
  Tie: number;
  X: number;
};

export type Winner = 'O' | 'Tie' | 'X' | null;
