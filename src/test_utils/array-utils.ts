const shuffleArray = (array: number[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


export const generateRandomArray = (minLen: number, maxLen: number, minValue: number, maxValue: number): number[] => {
    const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;

    const arr = Array.from({length}, () => {
        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    });

    return shuffleArray(arr);
}

export const generateAlmostSortedArray = (
    size: number,
    disorderRate = 0.05,
    min = 0,
    max = 10000
): number[] => {
    const step = Math.floor((max - min) / size);
    const arr = Array.from({ length: size }, (_, i) => min + i * step);

    const swaps = Math.floor(size * disorderRate);
    for (let i = 0; i < swaps; i++) {
        const idx1 = Math.floor(Math.random() * size);
        const idx2 = Math.floor(Math.random() * size);
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    }

    return arr;
};



export const measureTime = <T>(fn: () => T): [T, number] => {
    const t0 = performance.now();
    const result = fn();
    const t1 = performance.now();
    return [result, t1 - t0];
}