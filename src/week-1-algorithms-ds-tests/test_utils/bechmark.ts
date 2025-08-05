const fs = require('fs');
const path = require('node:path');

import { format } from 'fast-csv';
import { generateRandomArray, generateAlmostSortedArray, measureTime } from './array-utils';
import { bubbleSortVersion1, bubbleSortVersion2 } from '../bubble-sort/bubble_sort';

type SortFn = (arr: number[]) => number[];

type StatsRow = {
    version: string;
    size: number;
    run: number;
    timeMs: number;
};

const sizes = [100, 1000, 5000];
const runs = 1000;

function benchmarkFn(
    fn: SortFn,
    version: string,
    size: number,
    generator: (size: number) => number[]
): StatsRow[] {
    const results: StatsRow[] = [];
    for (let i = 0; i < runs; i++) {
        const input = generator(size);
        const [, time] = measureTime(() => fn([...input]));
        results.push({ version, size, run: i + 1, timeMs: time });
    }
    return results;
}

function runBenchmarksAndSaveCSV() {
    const allResults: StatsRow[] = [];

    for (const size of sizes) {
        allResults.push(...benchmarkFn(bubbleSortVersion1, 'v1_random', size, s => generateRandomArray(s, s, 0, 10000)));
        allResults.push(...benchmarkFn(bubbleSortVersion2, 'v2_random', size, s => generateRandomArray(s, s, 0, 10000)));

        allResults.push(...benchmarkFn(bubbleSortVersion1, 'v1_almostSorted', size, s => generateAlmostSortedArray(s, 0.01)));
        allResults.push(...benchmarkFn(bubbleSortVersion2, 'v2_almostSorted', size, s => generateAlmostSortedArray(s, 0.01)));
    }

    const csvPath = path.join(__dirname, 'benchmark_results.csv');
    const ws = fs.createWriteStream(csvPath);

    const csvStream = format<StatsRow, StatsRow>({ headers: true });
    csvStream.pipe(ws).on('finish', () => {
        console.log(`CSV saved to ${csvPath}`);
    });

    allResults.forEach(row => csvStream.write(row));
    csvStream.end();
}

runBenchmarksAndSaveCSV();