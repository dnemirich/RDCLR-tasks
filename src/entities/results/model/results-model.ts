import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { $winner } from 'entities/game';

export const LS_KEY = 'tic-tac-toe-results';

type Results = {
  O: number;
  Tie: number;
  X: number;
};

export const ResultsGate = createGate();

export const getResultsFx = createEffect<void, Results>(() => {
  const res = localStorage.getItem(LS_KEY);
  return res ? JSON.parse(res) : { O: 0, Tie: 0, X: 0 };
});

export const $results = createStore<Results>({ O: 0, Tie: 0, X: 0 }).on(
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
