import { allSettled, fork } from 'effector';

import { createGameModel, type GameModel } from './factory';

const emptyBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const boardClickedOnce = [
  ['X', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const xWinBoard = [
  ['X', 'X', 'X'],
  ['O', 'O', ''],
  ['', '', ''],
];

describe('Game model', () => {
  let model: GameModel;
  let cellClicked: GameModel['cellClicked'];
  let boardReset: GameModel['boardReset'];
  let $board: GameModel['$board'];
  let $currentPlayer: GameModel['$currentPlayer'];
  let $winner: GameModel['$winner'];
  let $gameStatus: GameModel['$gameStatus'];
  let $results: GameModel['$results'];
  let ResultsGate: GameModel['ResultsGate'];

  const gameId = 'test-game-1';
  const LS_KEY = `tic-tac-toe-results-${gameId}`;

  beforeEach(() => {
    localStorage.clear();
    model = createGameModel(gameId);
    ({
      $board,
      $currentPlayer,
      $gameStatus,
      $results,
      $winner,
      boardReset,
      cellClicked,
      ResultsGate,
    } = model);
  });

  test('should update the board on the click', async () => {
    const scope = fork();

    await allSettled(cellClicked, { params: { x: 0, y: 0 }, scope });

    expect(scope.getState($board)).toEqual(boardClickedOnce);
    expect(scope.getState($currentPlayer)).toBe('O');

    expect(scope.getState($winner)).toBe(null);
  });

  test('X should win with a row, status should change', async () => {
    const scope = fork();

    expect(scope.getState($gameStatus)).toBe('in_progress');
    expect(scope.getState($currentPlayer)).toBe('X');
    await allSettled(cellClicked, { params: { x: 0, y: 0 }, scope });
    expect(scope.getState($currentPlayer)).toBe('O');
    await allSettled(cellClicked, { params: { x: 1, y: 0 }, scope });
    expect(scope.getState($currentPlayer)).toBe('X');
    await allSettled(cellClicked, { params: { x: 0, y: 1 }, scope });
    await allSettled(cellClicked, { params: { x: 1, y: 1 }, scope });
    await allSettled(cellClicked, { params: { x: 0, y: 2 }, scope });

    expect(scope.getState($board)).toEqual(xWinBoard);

    expect(scope.getState($winner)).toBe('X');
    expect(scope.getState($gameStatus)).toBe('win');
  });

  test('game should end with a tie', async () => {
    const scope = fork();

    const moves = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
    ];

    for (const move of moves) {
      await allSettled(cellClicked, { params: move, scope });
    }

    expect(scope.getState($winner)).toBe('Tie');
    expect(scope.getState($gameStatus)).toBe('tie');
  });

  test('board should reset after boardReset event', async () => {
    const scope = fork();

    await allSettled(cellClicked, { params: { x: 0, y: 0 }, scope });
    await allSettled(cellClicked, { params: { x: 1, y: 1 }, scope });

    expect(
      scope
        .getState($board)
        .flat()
        .some((c) => c !== '')
    ).toBe(true);
    expect(scope.getState($winner)).toBe(null);

    await allSettled(boardReset, { scope });

    expect(scope.getState($board)).toEqual(emptyBoard);
    expect(scope.getState($winner)).toBe(null);
    expect(scope.getState($gameStatus)).toBe('in_progress');
    expect(scope.getState($currentPlayer)).toBe('X');
  });

  test('click on the same cell should be impossible', async () => {
    const scope = fork();

    await allSettled(cellClicked, { params: { x: 0, y: 0 }, scope });
    const firstBoard = scope.getState($board);

    await allSettled(cellClicked, { params: { x: 0, y: 0 }, scope });

    expect(scope.getState($board)).toEqual(firstBoard);

    expect(scope.getState($currentPlayer)).toBe('O');
  });

  test('should initialize with default values if localStorage is empty', async () => {
    const scope = fork();

    await allSettled(ResultsGate.open, { scope });

    expect(scope.getState($results)).toEqual({ O: 0, Tie: 0, X: 0 });
  });

  test('should initialize with values from localStorage', async () => {
    localStorage.setItem(LS_KEY, JSON.stringify({ O: 2, Tie: 5, X: 4 }));

    const scope = fork();

    await allSettled(ResultsGate.open, { scope });

    expect(scope.getState($results)).toEqual({ O: 2, Tie: 5, X: 4 });
  });

  test('should save results to localStorage', async () => {
    const scope = fork();

    await allSettled($results, { params: { O: 0, Tie: 0, X: 1 }, scope });

    expect(JSON.parse(localStorage.getItem(LS_KEY)!)).toEqual({
      O: 0,
      Tie: 0,
      X: 1,
    });
  });

  test('should not update results when there is no winner', async () => {
    const scope = fork({ values: [[$results, { O: 1, Tie: 1, X: 1 }]] });

    await allSettled($winner, { params: null, scope });

    expect(scope.getState($results)).toEqual({ O: 1, Tie: 1, X: 1 });
  });
});
