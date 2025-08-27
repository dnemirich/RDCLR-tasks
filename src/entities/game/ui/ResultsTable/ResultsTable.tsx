import { useGate } from 'effector-react';

import type { GameModel, Results } from '../../model';

import s from './ResultsTable.module.scss';

type Props = {
  gate: GameModel['ResultsGate'];
  results: Results;
};

export const ResultsTable = ({ gate, results }: Props) => {
  useGate(gate);

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(results).map(([name, score]) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
