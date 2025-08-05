import {
    generateAlmostSortedArray,
    generateRandomArray,
    generateReversedArray,
    measureTime
} from "../test_utils/array-utils";
import {bubbleSortVersion1, bubbleSortVersion2} from "./bubble_sort";

const sizes = [10, 100, 1000, 5000, 10000];

describe('Compare bubble sort versions performance', () => {
    sizes.forEach(size => {
        test(`compare versions on array of size ${size}`, () => {
            const input = generateRandomArray(size, size, 0, 10000);
            const expected = [...input].sort((a, b) => a - b);

            const [result1, time1] = measureTime(() => bubbleSortVersion1([...input]));
            const [result2, time2] = measureTime(() => bubbleSortVersion2([...input]));

            console.log(`Size: ${size} → V1: ${time1.toFixed(2)}ms, V2: ${time2.toFixed(2)}ms`);

            expect(result1).toEqual(expected);
            expect(result2).toEqual(expected);
        });
    });
});


describe('Bubble sort performance on almost sorted arrays', () => {
    sizes.forEach(size => {
        test(`compare versions on almost sorted array of size ${size}`, () => {
            const input = generateAlmostSortedArray(size, 0.01);
            const expected = [...input].sort((a, b) => a - b);

            const [result1, time1] = measureTime(() => bubbleSortVersion1([...input]));
            const [result2, time2] = measureTime(() => bubbleSortVersion2([...input]));

            console.log(`Size: ${size} (almost sorted) → V1: ${time1.toFixed(2)}ms, V2: ${time2.toFixed(2)}ms`);

            expect(result1).toEqual(expected);
            expect(result2).toEqual(expected);
        });
    });
});


describe('Bubble sort performance on arrays with negative numbers', () => {
    sizes.forEach(size => {
        test(`compare versions on array of size ${size}`, () => {
            const input = generateRandomArray(size, size, -10000, 10000);
            const expected = [...input].sort((a, b) => a - b);

            const [result1, time1] = measureTime(() => bubbleSortVersion1([...input]));
            const [result2, time2] = measureTime(() => bubbleSortVersion2([...input]));

            console.log(`Size: ${size} → V1: ${time1.toFixed(2)}ms, V2: ${time2.toFixed(2)}ms`);

            expect(result1).toEqual(expected);
            expect(result2).toEqual(expected);
        });
    });
});

describe('Bubble sort edge cases', () => {
    test('empty array', () => {
        const input: number[] = [];
        const expected: number[] = [];

        const [result1, time1] = measureTime(() => bubbleSortVersion1([...input]));
        const [result2, time2] = measureTime(() => bubbleSortVersion2([...input]));

        console.log(`Empty array sort → V1: ${time1.toFixed(2)}ms`);
        console.log(`Empty array sort → V2: ${time2.toFixed(2)}ms`);
        expect(result1).toEqual(expected);
        expect(result2).toEqual(expected);
    });

    test('single element array', () => {
        const input = [42];
        const expected = [42];

        const [result1, time1] = measureTime(() => bubbleSortVersion1([...input]));
        const [result2, time2] = measureTime(() => bubbleSortVersion2([...input]));

        console.log(`Single element array sort → V1: ${time1.toFixed(2)}ms`);
        console.log(`Single element array sort → V2: ${time2.toFixed(2)}ms`);

        expect(result1).toEqual(expected);
        expect(result2).toEqual(expected);
    });

    test('already sorted array', () => {
        const input = [1, 2, 3, 4, 5];
        const expected = [1, 2, 3, 4, 5];

        const [result1, time1] = measureTime(() => bubbleSortVersion1([...input]));
        const [result2, time2] = measureTime(() => bubbleSortVersion2([...input]));

        console.log(`Already sorted array sort → V1: ${time1.toFixed(2)}ms`);
        console.log(`Already sorted array sort → V2: ${time2.toFixed(2)}ms`);

        expect(result1).toEqual(expected);
        expect(result2).toEqual(expected);
    });
});

describe('Bubble sort performance on reversed arrays', () => {
    sizes.forEach(size => {
        test(`compare versions on reversed array of size ${size}`, () => {
            const input = generateReversedArray(size);
            const expected = [...input].sort((a, b) => a - b);

            const [result1, time1] = measureTime(() => bubbleSortVersion1([...input]));
            const [result2, time2] = measureTime(() => bubbleSortVersion2([...input]));

            console.log(`Size: ${size} (reversed) → V1: ${time1.toFixed(2)}ms, V2: ${time2.toFixed(2)}ms`);

            expect(result1).toEqual(expected);
            expect(result2).toEqual(expected);
        });
    });
});
