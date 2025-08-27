import { GameField, ResetButton, WinModal } from 'entities/game';
import { ResultsTable } from 'entities/results';

import s from './Game.module.scss';

export const Game = () => {
  return (
    <div className={s.game}>
      <h1 className={s.heading}>Tic-tac-toe</h1>

      <div className={s.wrapper}>
        <div className={s.gameContainer}>
          <ResetButton />
          <GameField />
        </div>

        <aside className={s.sidePanel}>
          <h2 className={s.heading}>Results:</h2>
          <ResultsTable />
        </aside>
      </div>
      <WinModal />
    </div>
  );
};
