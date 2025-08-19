import {boardReset} from "../../model/board-model.ts";
import s from './ResetButton.module.scss'

export const ResetButton = () => <button className={s.resetBtn} onClick={() => boardReset()}>Reset</button>;