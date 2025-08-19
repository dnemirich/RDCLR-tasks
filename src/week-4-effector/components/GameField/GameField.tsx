import {useUnit} from "effector-react";
import {$board, cellClicked} from "../../model/game-model.ts";

import s from './GameField.module.scss'
import {Cell} from "./Cell/Cell.tsx";

export const GameField = () => {
    const board = useUnit($board)

    return (
        <div className={s.board}>
            {
                board.map((row, x) => (
                    row.map((cell, y) => (
                        <Cell cell={cell} x={x} y={y} handleClick={cellClicked} key={`${x}-${y}`}/>
                    ))
                ))
            }
        </div>
    )
}

