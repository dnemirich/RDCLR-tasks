import {memo} from "react";
import s from './Cell.module.scss'

type Props = {
    x: number;
    y: number;
    cell: string;
    handleClick: ({x, y}: {x: number, y: number}) => void;
}

export const Cell = memo(({x, y, cell, handleClick}: Props) => {
    return (
        <button className={`${s.cell} ${s[`cell-${cell}`]}`}
                disabled={cell !== ''} onClick={() => handleClick({x, y})}>{cell}</button>
    )
})