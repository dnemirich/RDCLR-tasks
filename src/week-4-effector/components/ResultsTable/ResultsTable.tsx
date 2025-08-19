import s from './ResultsTable.module.scss'
import {$results, initializeResults} from "../../model/results-model.ts";
import {useUnit} from "effector-react";
import {memo, useEffect} from "react";

export const ResultsTable = memo(() => {
    const results = useUnit($results)

    useEffect(() => {
        initializeResults()
    }, []);

    return (
        <table className={s.table}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
            {
                Object.entries(results).map(([name, score]) => (
                    <tr key={name}>
                        <td>{name}</td>
                        <td>{score}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
})