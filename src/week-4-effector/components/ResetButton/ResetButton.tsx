import {boardReset} from "../../model/game-model.ts";
import s from './ResetButton.module.scss'

export const ResetButton = () => <button className={s.resetBtn} onClick={() => boardReset()}>Reset</button>;