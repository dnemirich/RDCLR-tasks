import {createEvent, createStore, sample} from "effector";

export type CellType = 'X' | 'O' | '';

export const cellClicked = createEvent<{ x: number, y: number }>();

export const boardReset = createEvent();


export const $moveNumber = createStore(0).on(cellClicked, (moveNumber) => moveNumber + 1).reset(boardReset);

export const $currentPlayer = $moveNumber.map(moveNumber => moveNumber % 2 === 0 ? 'X' : 'O');

export const $board = createStore<CellType[][]>(Array.from({length: 3}, () => Array(3).fill(''))).reset(boardReset)

sample({
    clock: cellClicked,
    source: {board: $board, currentPlayer: $currentPlayer},
    fn: ({board, currentPlayer}, {x, y}) => {
        const newBoard = board.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
                return rowIndex === x && colIndex === y ? currentPlayer : cell
            })
        })

        return newBoard
    },
    target: $board
})
