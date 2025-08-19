import {GameField} from "./components/GameField/GameField.tsx";
import s from './Game.module.scss'
import {ResetButton} from "./components/ResetButton/ResetButton.tsx";
import {ResultsTable} from "./components/ResultsTable/ResultsTable.tsx";
import {WinModal} from "./components/WinModal/WinModal.tsx";

export const Game = () => {
    return (
        <div className={s.game}>
            <h1 className={s.heading}>Tic-tac-toe</h1>

            <div className={s.wrapper}>
                <div className={s.gameContainer}>
                    <ResetButton/>
                    <GameField/>
                </div>

                <aside className={s.sidePanel}>
                    <h2 className={s.heading}>Results:</h2>
                    <ResultsTable/>
                </aside>
            </div>
            <WinModal/>
        </div>
    )
}
