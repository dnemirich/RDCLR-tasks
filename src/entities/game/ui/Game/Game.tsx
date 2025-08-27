import { useUnit } from 'effector-react';

import type { GameModel } from '../../model';

import { GameField } from '../GameField';
import { ResultsTable } from '../ResultsTable';
import { WinModal } from '../WinModal';
import s from './Game.module.scss';

type Props = {
  model: GameModel;
};

export const Game = ({ model }: Props) => {
  const {
    $board,
    $gameStatus,
    $results,
    $winner,
    boardReset,
    cellClicked,
    ResultsGate,
  } = model;

  const [board, gameStatus, results, winner] = useUnit([
    $board,
    $gameStatus,
    $results,
    $winner,
  ]);

  return (
    <div className={s.game}>
      <h1 className={s.heading}>Tic-tac-toe</h1>

      <div className={s.wrapper}>
        <div className={s.gameContainer}>
          <GameField board={board} onCellClick={cellClicked} />
        </div>

        <aside className={s.sidePanel}>
          <h2 className={s.heading}>Results:</h2>
          <ResultsTable gate={ResultsGate} results={results} />
        </aside>
      </div>
      <WinModal
        gameStatus={gameStatus}
        onBoardReset={boardReset}
        winner={winner}
      />
    </div>
  );
};
