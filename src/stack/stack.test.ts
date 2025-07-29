import {Stack} from "./stack";

describe('Stack', () => {
    it('should create a Stack with the methods', () => {
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
});