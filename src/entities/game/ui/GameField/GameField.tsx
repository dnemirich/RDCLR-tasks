import { type CellType } from '../../model';
import { Cell } from './Cell/Cell.tsx';
import s from './GameField.module.scss';

type Props = {
  board: CellType[][];
  onCellClick: ({ x, y }: { x: number; y: number }) => void;
};

export const GameField = ({ board, onCellClick }: Props) => {
  return (
    <div className={s.board}>
      {board.map((row, x) =>
        row.map((cell, y) => (
          <Cell
            cell={cell}
            handleClick={onCellClick}
            key={`${x}-${y}`}
            x={x}
            y={y}
          />
        ))
      )}
    </div>
  );
};
