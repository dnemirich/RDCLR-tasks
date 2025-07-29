import {
    generateAlmostSortedArray,
    generateArrayWithDuplicates,
    generateRandomArray,
    measureTime
} from "../test_utils/array-utils";

import {quickSort} from "./quick_sort";

const sizes = [10, 100, 1000, 5000, 10000];
const uniqValuesFractions = [0.1, 0.2, 0.3, 0.5, 0.8]

describe('Quick sort check', () => {
    sizes.forEach(size => {
        test(`quick sort on array of size ${size}`, () => {
            const input = generateRandomArray(size, size, 0, 10000);
            const expected = [...input].sort((a, b) => a - b);

            const [result, time] = measureTime(() => quickSort([...input]));


            console.log(`Size: ${size} → ${time.toFixed(2)}ms`);

            expect(result).toEqual(expected);
        });

        test(`quick sort on almost sorted array of size ${size}`, () => {
            const input = generateAlmostSortedArray(size, 0.1);
            const expected = [...input].sort((a, b) => a - b);

            const [result, time] = measureTime(() => quickSort([...input]));


            console.log(`Size: ${size} → ${time.toFixed(2)}ms`);

            expect(result).toEqual(expected);
        });


        test(`quick sort array of size ${size} with negative numbers`, () => {
            const input = generateRandomArray(size, size, -10000, 10000);
            const expected = [...input].sort((a, b) => a - b);

            const [result, time] = measureTime(() => quickSort([...input]));


            console.log(`Size: ${size} → ${time.toFixed(2)}ms`);

            expect(result).toEqual(expected);
        });

    });
});


describe('Quick sort check for arrays with dublicates', () => {
    sizes.forEach(size => {
        uniqValuesFractions.forEach((fraction) => {
            test(`quick sort array of size ${size} with ${fraction} fraction of unique elements`, () => {
                const input = generateArrayWithDuplicates(size, fraction)
                const expected = [...input].sort((a, b) => a - b);

                const [result, time] = measureTime(() => quickSort([...input]));


                console.log(`Size ${size}, duplicates ${100 - fraction * 100} % → ${time.toFixed(2)}ms`);

                expect(result).toEqual(expected);
            });
        })
    })
})