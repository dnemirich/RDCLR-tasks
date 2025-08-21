import {allSettled, fork} from "effector";
import {$board, $currentPlayer, $gameStatus, $winner, boardReset, cellClicked} from "./game-model";


const emptyBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

const boardClickedOnce = [
    ['X', '', ''],
    ['', '', ''],
    ['', '', '']
]

const xWinBoard = [
    ['X', 'X', 'X'],
    ['O', 'O', ''],
    ['', '', '']
]

describe('Game model', () => {
    test('should update the board on the click', async () => {
        const scope = fork()

        await allSettled(cellClicked, {scope, params: {x: 0, y: 0}})

        expect(scope.getState($board)).toEqual(boardClickedOnce)
        expect(scope.getState($currentPlayer)).toBe("O")

        expect(scope.getState($winner)).toBe(null);
    })


    test("X should win with a row, status should change", async () => {
        const scope = fork();

        expect(scope.getState($gameStatus)).toBe("in_progress");
        expect(scope.getState($currentPlayer)).toBe("X")
        await allSettled(cellClicked, {scope, params: {x: 0, y: 0}});
        expect(scope.getState($currentPlayer)).toBe("O")
        await allSettled(cellClicked, {scope, params: {x: 1, y: 0}});
        expect(scope.getState($currentPlayer)).toBe("X")
        await allSettled(cellClicked, {scope, params: {x: 0, y: 1}});
        await allSettled(cellClicked, {scope, params: {x: 1, y: 1}});
        await allSettled(cellClicked, {scope, params: {x: 0, y: 2}});

        expect(scope.getState($board)).toEqual(xWinBoard)

        expect(scope.getState($winner)).toBe("X");
        expect(scope.getState($gameStatus)).toBe("win");
    });

    test("game should end with a tie", async () => {
        const scope = fork();

        const moves = [
            {x: 0, y: 0},
            {x: 0, y: 1},
            {x: 0, y: 2},
            {x: 1, y: 1},
            {x: 1, y: 0},
            {x: 1, y: 2},
            {x: 2, y: 1},
            {x: 2, y: 0},
            {x: 2, y: 2},
        ];

        for (const move of moves) {
            await allSettled(cellClicked, {scope, params: move});
        }

        expect(scope.getState($winner)).toBe("Tie");
        expect(scope.getState($gameStatus)).toBe("tie");
    });

    test("board should reset after boardReset event", async () => {
        const scope = fork();

        await allSettled(cellClicked, {scope, params: {x: 0, y: 0}});
        await allSettled(cellClicked, {scope, params: {x: 1, y: 1}});

        expect(scope.getState($board).flat().some(c => c !== '')).toBe(true);
        expect(scope.getState($winner)).toBe(null);

        await allSettled(boardReset, {scope});

        expect(scope.getState($board)).toEqual(emptyBoard);
        expect(scope.getState($winner)).toBe(null);
        expect(scope.getState($gameStatus)).toBe("in_progress");
        expect(scope.getState($currentPlayer)).toBe("X");
    });

    test("click on the same cell should be impossible", async () => {
        const scope = fork();

        await allSettled(cellClicked, {scope, params: {x: 0, y: 0}});
        const firstBoard = scope.getState($board);

        await allSettled(cellClicked, {scope, params: {x: 0, y: 0}});

        expect(scope.getState($board)).toEqual(firstBoard);

        expect(scope.getState($currentPlayer)).toBe("O");
    });
})