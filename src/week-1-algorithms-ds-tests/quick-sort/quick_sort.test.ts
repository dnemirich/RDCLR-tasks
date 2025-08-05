import {
    generateAlmostSortedArray,
    generateArrayWithDuplicates,
    generateRandomArray, generateReversedArray,
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


describe('Quick sort check for arrays with duplicates', () => {
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

describe('Quick sort for edge conditions', () => {
    test('empty array', () => {
        const input = [];
        const [result, time] = measureTime(() => quickSort([...input]));
        const expected = [];

        console.log(`Empty array sort → ${time.toFixed(2)}ms`);
        expect(result).toEqual(expected)
    })

    test('single element array', () => {
        const input = [1];
        const [result, time] = measureTime(() => quickSort([...input]));
        const expected = [...input];

        console.log(`Single element array sort → ${time.toFixed(2)}ms`);
        expect(result).toEqual(expected)
    })

    test('array of the same elements', () => {
        const input = [1, 1, 1, 1, 1];
        const [result, time] = measureTime(() => quickSort([...input]));
        const expected = [...input];

        console.log(`Array of identical elements sort → ${time.toFixed(2)}ms`);
        expect(result).toEqual(expected)
    })

    test('already sorted array', () => {
        const input = Array.from({length: 1000}, (_, i) => i);
        const expected = [...input];
        const [result, time] = measureTime(() => quickSort([...input]));

        console.log(`Already sorted array sort → ${time.toFixed(2)}ms`);
        expect(result).toEqual(expected);
    });
})


describe('Bubble sort performance on reversed arrays', () => {
    sizes.forEach(size => {
        test(`compare versions on reversed array of size ${size}`, () => {
            const input = generateReversedArray(size);
            const expected = [...input].sort((a, b) => a - b);

            const [result, time] = measureTime(() => quickSort([...input]));

            console.log(`Size: ${size} (reversed) →: ${time.toFixed(2)}ms`);

            expect(result).toEqual(expected);
        });
    });
});