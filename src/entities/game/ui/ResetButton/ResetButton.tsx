import { useUnit } from 'effector-react';

import { boardReset } from '../../model';
import s from './ResetButton.module.scss';

export const ResetButton = () => {
  const reset = useUnit(boardReset);
  return (
    <button className={s.resetBtn} onClick={reset}>
      Reset
    </button>
  );
};
