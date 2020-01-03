const arrayInput = input.split('\n');
const [numPeople, numQueries] = arrayInput.shift().split(' ');
const coms = {};

arrayInput.forEach(query => {
    const [action, person1, person2] = query.split(' ');

    if (action === 'Q') {
        const length = coms[person1] ? coms[person1].size : 1;
        console.log(length);
    } else {
        const com1 = coms[person1] ? coms[person1] : new Set([person1]);
        const com2 = coms[person2] ? coms[person2] : new Set([person2]);

        if (com1 === com2) return;

        if (com1.size > com2.size) {
            mergeComs(com1, com2, person1);
        } else {
            mergeComs(com2, com1, person2);
        }
    }
});

function mergeComs(com1, com2, person1) {
    for (let person of com2) {
        com1.add(person);
        coms[person] = com1;
    }

    coms[person1] = com1;
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
