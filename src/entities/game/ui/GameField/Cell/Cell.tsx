import { memo } from 'react';

import s from './Cell.module.scss';

type Props = {
  cell: string;
  handleClick: ({ x, y }: { x: number; y: number }) => void;
  x: number;
  y: number;
};

export const Cell = memo(({ cell, handleClick, x, y }: Props) => {
  return (
    <button
      className={`${s.cell} ${s[`cell-${cell}`]}`}
      disabled={cell !== ''}
      onClick={() => handleClick({ x, y })}
    >
      {cell}
    </button>
  );
});
