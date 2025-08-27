import { useUnit } from 'effector-react';

import { $board, cellClicked } from '../../model';
import { Cell } from './Cell/Cell.tsx';
import s from './GameField.module.scss';

export const GameField = () => {
  const [board, onClick] = useUnit([$board, cellClicked]);

  return (
    <div className={s.board}>
      {board.map((row, x) =>
        row.map((cell, y) => (
          <Cell
            cell={cell}
            handleClick={onClick}
            key={`${x}-${y}`}
            x={x}
            y={y}
          />
        ))
      )}
    </div>
  );
};
