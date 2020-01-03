const arrayInput = input.split('\n');

const [numPeople, numQueries] = arrayInput.shift().split(' ');

const communities = {};

arrayInput.forEach(query => {
    const [action, arg1, arg2] = query.split(' ');

    if (action === 'Q') {
        const length = communities[arg1] ? communities[arg1].length : 1;
        console.log(length);
    } else {
        const com1 = communities[arg1] ? communities[arg1] : [arg1];
        const com2 = communities[arg2] ? communities[arg2] : [arg2];

        const concat = mergeArray(com1, com2);

        concat.forEach(person => communities[person] = concat);
    }
});

function mergeArray(a, b) {
    return a.concat(b.filter((item) => a.indexOf(item) < 0));
}




// 3 6
// Q 1
// M 1 2
// Q 2
// M 2 3
// Q 3
// Q 2

// 1
// 2
// 3
// 3
