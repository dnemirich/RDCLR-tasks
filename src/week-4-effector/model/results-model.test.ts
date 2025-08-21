import {allSettled, fork} from "effector";
import {$results, getResultsFx, LS_KEY} from "./results-model";
import {$winner} from "./game-model";

describe('Results model', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    test("should initialize with default values if localStorage is empty", async () => {
        const scope = fork();

        await allSettled(getResultsFx, {scope});

        expect(scope.getState($results)).toEqual({X: 0, O: 0, Tie: 0});
    });

    test("should initialize with values from localStorage", async () => {
        localStorage.setItem(LS_KEY, JSON.stringify({X: 4, O: 2, Tie: 5}));

        const scope = fork();

        await allSettled(getResultsFx, {scope});

        expect(scope.getState($results)).toEqual({X: 4, O: 2, Tie: 5});
    });

    test("should save results to localStorage", async () => {
        const scope = fork();

        await allSettled($results, {scope, params: {X: 1, O: 0, Tie: 0}});

        expect(JSON.parse(localStorage.getItem(LS_KEY)!)).toEqual({X: 1, O: 0, Tie: 0});
    });

    test("should not update results when there is no winner", async () => {
        const scope = fork({values: [[$results, {X: 1, O: 1, Tie: 1}]]});

        await allSettled($winner, {scope, params: null});

        expect(scope.getState($results)).toEqual({X: 1, O: 1, Tie: 1});
    });
})