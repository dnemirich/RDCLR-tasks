import { useRef } from 'react';

import s from './blockSizeCalculation.module.scss';
import { useBlockSize } from './useBlockSize.ts';

export const BlockSizeCalculation = () => {
  const blockRef = useRef<HTMLDivElement | null>(null);
  const size = useBlockSize(blockRef);

  return (
    <div className={s.taskContainer}>
      <h2>Block size calculation</h2>
      <p>
        Block size: {size.width}px width, {size.height}px height
      </p>
      <div className={s.block} ref={blockRef}></div>
    </div>
  );
};
