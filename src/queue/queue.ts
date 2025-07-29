interface QueueI<T> {
    enqueue: (value: T) => void;
    dequeue: () => T | null | undefined;
}

 // Using built-in methods
// export class Queue<T> implements  QueueI<T> {
//     private queue: T[] = [];
//
//     enqueue(value: T){
//         this.queue.push(value);
//     }
//
//     dequeue(){
//         return this.queue.shift()
//     }
// }


interface ListNode<T>{
    value: T;
    next: null | ListNode<T>;
}

class ListNode<T> implements ListNode<T> {
    constructor(x: T) {
        this.value = x;
        this.next = null;
    }
}

export class Queue<T> implements  QueueI<T> {
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;
    constructor() {
        this.head = null;
        this.tail = null;
    }

    enqueue(value: T){
        const node = new ListNode(value);
        if(this.tail === null && this.head === null){
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    dequeue(){
        if(this.head === null){
            return null;
        } else {
            const val = this.head.value
            this.head = this.head.next;
            return val;
        }
    }
}