import {createEvent, createStore, sample} from "effector";
import {cellClicked, $board, boardReset, type CellType, $currentPlayer} from "./board-model";

export const gameWon = createEvent()

export const $gameStatus = createStore<'in_progress' | 'win' | 'idle'>('idle')
    .on(gameWon, () => 'win')
    .reset(boardReset)

export const $winner = createStore<'X' | 'O' | 'Tie' | null>(null)

export const checkWin = (board: string[][], x: number, y: number, currentPlayer: CellType) => {
    const N = board.length;

    if (currentPlayer === '') return false;

    let rowWin = true;
    for (let colIdx = 0; colIdx < N; colIdx++) {
        if (board[x][colIdx] !== currentPlayer) {
            rowWin = false;
            break;
        }
    }

    let colWin = true;

    for (let rowIdx = 0; rowIdx < N; rowIdx++) {
        if (board[rowIdx][y] !== currentPlayer) {
            colWin = false;
            break;
        }
    }


    let diagWin = true;
    if (x === y) {
        for (let i = 0; i < N; i++) {
            if (board[i][i] !== currentPlayer) {
                diagWin = false;
                break;
            }
        }
    } else {
        diagWin = false;
    }

    let antiDiagWin = true;
    if (x + y === N - 1) {
        for (let j = 0; j < N; j++) {
            if (board[j][N - j - 1] !== currentPlayer) {
                antiDiagWin = false;
                break;
            }
        }
    } else {
        antiDiagWin = false;
    }


    return rowWin || colWin || diagWin || antiDiagWin;
}

// sample({
//     clock: cellClicked,
//     source: {board: $board, currentPlayer: $currentPlayer},
//     fn: ({board, currentPlayer}, {x, y}) => {
//         return checkWin(board, x, y, currentPlayer)
//     },
//     target: gameWon
// })