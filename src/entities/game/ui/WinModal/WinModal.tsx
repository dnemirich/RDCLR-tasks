import { useUnit } from 'effector-react/effector-react.umd';
import { createPortal } from 'react-dom';

import { $gameStatus, $winner } from '../../model';
import { ResetButton } from '../ResetButton';
import s from './WinModal.module.scss';

export const WinModal = () => {
  const [gameStatus, winner] = useUnit([$gameStatus, $winner]);

  if (gameStatus === 'in_progress') return null;

  return createPortal(
    <div className={s.overlay}>
      <div className={s.modal}>
        <div className={s.content}>
          {winner !== 'Tie' ? (
            <p>
              Player <span className={s.winner}>{winner}</span> won this game!
            </p>
          ) : (
            <p>That's a tie, unfortunately!</p>
          )}

          <p>Press button to restart the game</p>
          <ResetButton />
        </div>
      </div>
    </div>,
    document.body
  );
};
