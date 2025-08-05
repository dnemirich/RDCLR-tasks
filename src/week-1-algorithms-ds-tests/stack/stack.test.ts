import {Stack} from "./stack";

describe('Stack', () => {
    test('should create a Stack with the methods', () => {
        const stack = new Stack();
        stack.push(5);
        stack.push(6);
        stack.push(7);

        expect(stack.peek()).toBe(7);
        expect(stack.pop()).toBe(7);
        expect(stack.peek()).toBe(6);
        expect(stack.pop()).toBe(6);
        expect(stack.peek()).toBe(5);
        expect(stack.pop()).toBe(5);
        expect(stack.peek()).toBeUndefined();
        expect(stack.pop()).toBeUndefined();
    });

    test('stack handles large number of operations', () => {
        const stack = new Stack<number>();
        for (let i = 0; i < 10000; i++) {
            stack.push(i);
        }
        for (let i = 9999; i >= 0; i--) {
            expect(stack.pop()).toBe(i);
        }
    });
});