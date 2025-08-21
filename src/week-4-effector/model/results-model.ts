import {createEffect, createStore, sample} from "effector";
import {$winner} from "./game-model";

export const LS_KEY = 'tic-tac-toe-results';

type Results = {
    X: number,
    O: number,
    Tie: number,
}

export const getResultsFx = createEffect<void, Results>(() => {
    const res = localStorage.getItem(LS_KEY)
    return res ? JSON.parse(res) : {'X': 0, 'O': 0, 'Tie': 0}
})

export const $results = createStore<Results>({'X': 0, 'O': 0, 'Tie': 0})
    .on(getResultsFx.doneData, (_, result) => result)

sample({
    clock: $results.updates,
    fn: (results) => results,
    target: createEffect((results: Results) => {
        localStorage.setItem(LS_KEY, JSON.stringify(results));
    })
});

sample({
    clock: $winner,
    source: $results,
    fn: (results, winner) => {
        if (winner) {
            return {
                ...results,
                [winner]: results[winner] + 1

            }
        } else {
            return results
        }
    },
    target: $results
})

export const initializeResults = () => {
    getResultsFx();
};