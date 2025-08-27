import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

import type { CellType, GameStatus, Results, Winner } from './types';

import { checkWin } from '../lib';

export type GameModel = ReturnType<typeof createGameModel>;

export function createGameModel(id: string) {
  const LS_KEY = `tic-tac-toe-results-${id}`;
  const cellClicked = createEvent<{ x: number; y: number }>();
  const boardReset = createEvent();

  function initializeBoard() {
    const $board = createStore<CellType[][]>(
      Array.from({ length: 3 }, () => Array(3).fill(''))
    ).reset(boardReset);

    const $currentPlayer = $board.map((board) => {
      const filled = board.flat().filter((c) => c !== '').length;
      return filled % 2 === 0 ? 'X' : 'O';
    });

    sample({
      clock: cellClicked,
      fn: ({ board, currentPlayer }, { x, y }) => {
        if (board[x][y] !== '') return board;
        return board.map((row, rowIndex) => {
          return row.map((cell, colIndex) => {
            return rowIndex === x && colIndex === y ? currentPlayer : cell;
          });
        });
      },
      source: { board: $board, currentPlayer: $currentPlayer },
      target: $board,
    });

    return { $board, $currentPlayer };
  }

  function checkGameStatus(
    $board: typeof board.$board,
    $currentPlayer: typeof board.$currentPlayer
  ) {
    const $winner = createStore<Winner>(null).reset(boardReset);

    const $gameStatus = createStore<GameStatus>('in_progress')
      .on($winner, (_, w) =>
        w === null ? 'in_progress' : w === 'Tie' ? 'tie' : 'win'
      )
      .reset(boardReset);
    sample({
      clock: $board,
      fn: ({ board, currentPlayer }) => {
        const size = board.length;

        const lastMovePlayer = currentPlayer === 'X' ? 'O' : 'X';

        for (let row = 0; row < size; row++) {
          for (let col = 0; col < size; col++) {
            if (
              board[row][col] === lastMovePlayer &&
              checkWin(board, row, col, lastMovePlayer)
            ) {
              return lastMovePlayer;
            }
          }
        }

        if (board.flat().every((c) => c !== '')) return 'Tie';
        return null;
      },
      source: { board: $board, currentPlayer: $currentPlayer },
      target: $winner,
    });

    return { $gameStatus, $winner };
  }

  function getResults($winner: typeof gameStatus.$winner) {
    const ResultsGate = createGate<void>();

    const getResultsFx = createEffect<void, Results>(() => {
      const res = localStorage.getItem(LS_KEY);
      return res ? JSON.parse(res) : { O: 0, Tie: 0, X: 0 };
    });

    const $results = createStore<Results>({ O: 0, Tie: 0, X: 0 }).on(
      getResultsFx.doneData,
      (_, result) => result
    );

    sample({
      clock: ResultsGate.open,
      target: getResultsFx,
    });

    sample({
      clock: $results.updates,
      fn: (results) => results,
      target: createEffect((results: Results) => {
        localStorage.setItem(LS_KEY, JSON.stringify(results));
      }),
    });

    sample({
      clock: $winner,
      fn: (results, winner) => {
        if (winner) {
          return {
            ...results,
            [winner]: results[winner] + 1,
          };
        } else {
          return results;
        }
      },
      source: $results,
      target: $results,
    });

    return { $results, ResultsGate };
  }

  const board = initializeBoard();
  const gameStatus = checkGameStatus(board.$board, board.$currentPlayer);
  const results = getResults(gameStatus.$winner);

  return {
    ...board,
    ...gameStatus,
    ...results,
    boardReset,
    cellClicked,
  };
}
