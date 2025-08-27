import { useGate, useUnit } from 'effector-react';
import { memo } from 'react';

import { $results, ResultsGate } from '../../model';
import s from './ResultsTable.module.scss';

export const ResultsTable = memo(() => {
  const results = useUnit($results);
  useGate(ResultsGate);

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
});
