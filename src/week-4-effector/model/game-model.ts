import {createEvent, createStore, sample} from "effector";
import {checkWin} from "../utils/game-utils";

export type CellType = 'X' | 'O' | '';

export const cellClicked = createEvent<{ x: number, y: number }>();

export const boardReset = createEvent();

export const $winner = createStore<'X' | 'O' | 'Tie' | null>(null).reset(boardReset);

$winner.watch((newWinner) => {
    console.log('Winner changed:', newWinner);
});


export const $gameStatus = createStore<'tie' | 'win' | 'in_progress'>('in_progress')
    .on($winner, (_, w) => w === null ? 'in_progress' : w === 'Tie' ? 'tie' : 'win')
    .reset(boardReset)

export const $board = createStore<CellType[][]>(Array.from({length: 3}, () => Array(3).fill(''))).reset(boardReset)


export const $currentPlayer = $board.map(board => {
    const filled = board.flat().filter(c => c !== '').length;
    return filled % 2 === 0 ? 'X' : 'O';
});


sample({
    clock: cellClicked,
    source: {board: $board, currentPlayer: $currentPlayer},
    fn: ({board, currentPlayer}, {x, y}) => {
        if (board[x][y] !== '') return board;
        const newBoard = board.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
                return rowIndex === x && colIndex === y ? currentPlayer : cell
            })
        })

        return newBoard
    },
    target: $board
})

// sample({
//     clock: cellClicked,
//     source: {board: $board, currentPlayer: $currentPlayer},
//     fn: ({board, currentPlayer}, {x, y}) => {
//         if (board[x][y] !== '') return null;
//         const newBoard = board.map((row, i) =>
//             row.map((cell, j) => (i === x && j === y ? currentPlayer : cell))
//         );
//         if (checkWin(newBoard, x, y, currentPlayer)) return currentPlayer;
//         if(newBoard.flat().every((cell) => cell !== '')) return 'Tie'
//
//         return null;
//     },
//     target: $winner
// })

sample({
    clock: $board,
    source: { board: $board, currentPlayer: $currentPlayer },
    fn: ({ board, currentPlayer }) => {
        const size = board.length;

        const lastMovePlayer = currentPlayer === 'X' ? 'O' : 'X';

        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (board[row][col] === lastMovePlayer && checkWin(board, row, col, lastMovePlayer)) {
                    return lastMovePlayer;
                }
            }
        }

        if (board.flat().every(c => c !== '')) return 'Tie';
        return null;
    },
    target: $winner,
});