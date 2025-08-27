import { createPortal } from 'react-dom';

import type { GameStatus, Winner } from '../../model';

import { ResetButton } from '../ResetButton';
import s from './WinModal.module.scss';

type Props = {
  gameStatus: GameStatus;
  onBoardReset: () => void;
  winner: Winner;
};
export const WinModal = ({ gameStatus, onBoardReset, winner }: Props) => {
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
          <ResetButton onClick={onBoardReset} />
        </div>
      </div>
    </div>,
    document.body
  );
};
