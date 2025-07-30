import { solveHanoi } from './hanoi';

describe('Hanoi Tower Solver', () => {
    test('should solve 1-disk puzzle', () => {
        const result = solveHanoi(1);
        expect(result).toEqual(['Move disk 1 from A to C']);
    });

    test('should solve 2-disk puzzle', () => {
        const result = solveHanoi(2);
        expect(result).toEqual([
            'Move disk 1 from A to B',
            'Move disk 2 from A to C',
            'Move disk 1 from B to C'
        ]);
    });

    test('should solve 3-disk puzzle', () => {
        const result = solveHanoi(3);
        console.log(result);
        expect(result.length).toBe(7);
        expect(result[0]).toBe('Move disk 1 from A to C');
        expect(result[5]).toBe('Move disk 2 from B to C');
        expect(result[6]).toBe('Move disk 1 from A to C');
    });

    test('should have correct number of steps', () => {
        for (let n = 1; n <= 10; n++) {
            const result = solveHanoi(n);
            console.log('Solution for n = ' + n + ': ' + result.join(','))
            expect(result.length).toBe(Math.pow(2, n) - 1);
        }
    });
});
