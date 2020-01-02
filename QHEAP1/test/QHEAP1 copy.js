function processData(input) {
    const queries = input.split('\n');
    const numQueries = queries.shift();
    const heap = [];

    queries.forEach(query => {
        console.log('=========== new query ===========');
        if (query === '3') {
            console.log(heap[0]);
            return;
        } 
        
        const [request, number] = query.split(' ');

        if (request === '1') { // add element
            console.log('#### adding number: ' + number + ' ####');
            siftUp(heap, Number(number), nodeIndex = heap.length);
            console.log('adding ended with heap: ', heap);
        } else { // remove element
            console.log('#### removing number: ' + number + ' ####');
            const nodeIndex = heap.indexOf(Number(number));

            // deleting last heap element and extracting it
            const lastElement = heap.pop();

            if (heap.length === 0) {
                console.log('returning since length === 0');
                console.log('removing ended with heap: ', heap);
                return;
            }

            if (lastElement === Number(number)) {
                console.log('returning since lastElement === number');
                console.log('removing ended with heap: ', heap);
                return;
            }

            // sifting up the change
            siftUp(heap, lastElement, nodeIndex);

            // sifting down the change
            siftDown(heap, heap[nodeIndex], nodeIndex);
            console.log('removing ended with heap: ', heap);
        }
    });
}

function siftUp(heap, number, nodeIndex) {
    console.log('** sifting UP with heap: ', heap, ' and number: ', number, ' and nodeIndex: ', nodeIndex);

    if (nodeIndex <= 0) {
        heap[0] = number;
        console.log('nodeIndex <= 0 and heap: ', heap);
    } else {
        const parent = Math.floor((nodeIndex-1)/2);

        if (heap[parent] > number) {
            console.log('heap[parent] > number');

            heap[nodeIndex] = heap[parent];

            console.log('heap statut before new sifting up: ', heap);

            siftUp(heap, number, parent);
        } else {
            heap[nodeIndex] = number;
            console.log('heap[parent] < number and ending with heap: ', heap);
        }
    }
}

function siftDown(heap, number, nodeIndex) {
    console.log('** sifting DOWN with heap: ', heap, ' and number: ', number, ' and nodeIndex: ', nodeIndex);

    const lastIndex = heap.length - 1;
    const leftChildIndex = 2*nodeIndex + 1;
    const rightChildIndex = 2*nodeIndex + 2;

    if (lastIndex < leftChildIndex) {
        console.log('returning since lastIndex < leftChildIndex')
        return;
    } 

    const leftChild = heap[leftChildIndex];
    const rightChild = heap[rightChildIndex] || leftChild + 1;

    console.log('check leftChild: ', leftChild, ' rightChild: ', rightChild, ' min des 2: ', Math.min(leftChild, rightChild), ' et number: ', number)

    if (number <= Math.min(leftChild, rightChild)) {
        console.log('returning since number <= Math.min(leftChild, rightChild)')
        return;
    }

    if (leftChild < rightChild) {
        console.log('leftChild < rightChild and heap now (before continuing sifting down: ', heap)
        heap[nodeIndex] = leftChild;
        siftDown(heap, number, leftChildIndex);
    } else {
        console.log('leftChild >= rightChild and heap now (before continuing sifting down: ', heap)
        heap[nodeIndex] = rightChild;
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
