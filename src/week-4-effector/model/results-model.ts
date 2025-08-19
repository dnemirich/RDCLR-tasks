import {createEffect, createStore} from "effector";

const LS_KEY = 'tic-tac-toe-results';

type Results = {
    X: number,
    O: number,
    Tie: number,
}

const getResultsFx = createEffect<void, Results>(() => {
    const res = localStorage.getItem(LS_KEY)
    return res ? JSON.parse(res) : {'X': 0, 'O': 0, 'Tie': 0}
})

export const $results = createStore<Results>({'X': 0, 'O': 0, 'Tie': 0})
    .on(getResultsFx.doneData, (_, result) => result)

export const initializeResults = () => {
    getResultsFx();
};
