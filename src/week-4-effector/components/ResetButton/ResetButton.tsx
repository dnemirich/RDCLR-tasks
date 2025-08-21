import {boardReset} from "../../model/game-model.ts";
import s from './ResetButton.module.scss'
import {useUnit} from "effector-react";

export const ResetButton = () => {
    const reset = useUnit(boardReset)
    return <button className={s.resetBtn} onClick={reset}>Reset</button>;
}