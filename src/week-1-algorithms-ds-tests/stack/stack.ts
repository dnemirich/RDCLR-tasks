interface StackI<T> {
    peek: () => T | undefined;
    push: (x: T) => void;
    pop: () => T | undefined;
}

export class Stack<T> implements StackI<T> {
    private stack: T[] = [];

    peek () {
        return this.stack[this.stack.length - 1];
    }

    pop () {
        return this.stack.pop();
    }

    push(value: T) {
        this.stack.push(value);
    }
}