import { allSettled, fork } from 'effector';
import { $winner } from 'entities/game';

import { $results, getResultsFx, LS_KEY } from './results-model.ts';

describe('Results model', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should initialize with default values if localStorage is empty', async () => {
    const scope = fork();

    await allSettled(getResultsFx, { scope });

    expect(scope.getState($results)).toEqual({ O: 0, Tie: 0, X: 0 });
  });

  test('should initialize with values from localStorage', async () => {
    localStorage.setItem(LS_KEY, JSON.stringify({ O: 2, Tie: 5, X: 4 }));

    const scope = fork();

    await allSettled(getResultsFx, { scope });

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
