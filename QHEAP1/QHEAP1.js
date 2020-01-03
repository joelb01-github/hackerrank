function processData(input) {
    const queries = input.split('\n');
    const numQueries = queries.shift();
    const heap = [];

    queries.forEach(query => {
        if (query === '3') {
            console.log(heap[0]);
            return;
        } 
        
        const [request, number] = query.split(' ');

        if (request === '1') { // add element
            siftUp(heap, Number(number), nodeIndex = heap.length);
        } else { // remove element
            const nodeIndex = heap.indexOf(Number(number));

            // deleting last heap element and extracting it
            const lastElement = heap.pop();

            if (heap.length === 0) return;
            if (lastElement === Number(number)) return;

            // sifting up the change
            siftUp(heap, lastElement, nodeIndex);

            // sifting down the change
            siftDown(heap, heap[nodeIndex], nodeIndex);
        }
    });
}

function siftUp(heap, number, nodeIndex) {
    if (nodeIndex <= 0) {
        heap[0] = number;
    } else {
        const parent = Math.floor((nodeIndex-1)/2);

        if (number < heap[parent]) {
            heap[nodeIndex] = heap[parent];
            siftUp(heap, number, parent);
        } else {
            heap[nodeIndex] = number;
        }
    }
}

function siftDown(heap, number, nodeIndex) {
    const lastIndex = heap.length - 1;
    const leftChildIndex = 2*nodeIndex + 1;
    const rightChildIndex = 2*nodeIndex + 2;

    if (lastIndex < leftChildIndex) {
        return;
    } 

    const leftChild = heap[leftChildIndex];
    const rightChild = heap[rightChildIndex] || leftChild + 1;

    if (number <= Math.min(leftChild, rightChild)) {
        return;
    }

    if (leftChild < rightChild) {
        heap[nodeIndex] = leftChild;
        heap[leftChildIndex] = number;
        siftDown(heap, number, leftChildIndex);
    } else {
        heap[nodeIndex] = rightChild;
        heap[rightChildIndex] = number;
        siftDown(heap, number, rightChildIndex);
    }
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
