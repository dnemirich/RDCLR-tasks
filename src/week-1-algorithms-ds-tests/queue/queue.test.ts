import {Queue} from "./queue";

describe('Queue', () => {
    test('should enqueue and dequeue in FIFO order', () => {
        const queue = new Queue<number>();

        queue.enqueue(5);
        queue.enqueue(6);
        queue.enqueue(7);

        expect(queue.dequeue()).toBe(5);
        expect(queue.dequeue()).toBe(6);
        expect(queue.dequeue()).toBe(7);
        expect([null, undefined]).toContain(queue.dequeue());
    });


    test('should handle enqueueing and dequeuing single item', () => {
        const queue = new Queue<string>();
        queue.enqueue('first');

        expect(queue.dequeue()).toBe('first');
        expect([null, undefined]).toContain(queue.dequeue());
    });

    test('should return null when dequeueing from empty queue', () => {
        const queue = new Queue();
        expect([null, undefined]).toContain(queue.dequeue());
    });

    test('should maintain correct order after mixed enqueue/dequeue', () => {
        const queue = new Queue<number>();

        queue.enqueue(1);
        queue.enqueue(2);
        expect(queue.dequeue()).toBe(1);

        queue.enqueue(3);
        queue.enqueue(4);
        expect(queue.dequeue()).toBe(2);
        expect(queue.dequeue()).toBe(3);
        expect(queue.dequeue()).toBe(4);
        expect([null, undefined]).toContain(queue.dequeue());
    });
});
