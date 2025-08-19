import {createPortal} from "react-dom";
import {useUnit} from "effector-react/effector-react.umd";
import {$gameStatus, $winner} from "../../model/game-model.ts";
import {ResetButton} from "../ResetButton/ResetButton.tsx";

import s from './WinModal.module.scss'

export const WinModal = () => {
    const gameStatus = useUnit($gameStatus);
    const winner = useUnit($winner);

    if (gameStatus !== 'win') return null;

    return createPortal((
        <div className={s.overlay}>
            <div className={s.modal}>
                <div className={s.content}>
                    {
                        winner !== 'Tie' ?
                            <p>Player <span className={s.winner}>{winner}</span> won this game!</p> :
                            <p>That's a tie, unfortunately!</p>
                    }

                    <p>Press button to restart the game</p>
                    <ResetButton/>
                </div>
            </div>
        </div>
    ), document.body
)

}