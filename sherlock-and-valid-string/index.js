'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function isValid(s) {

    const list = {};

    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => list[letter] = 0);

    s.split('').forEach(letter => list[letter]++);

    Object.keys(list).forEach(letter => {
        if (list[letter] === 0) delete list[letter];
    });

    let numbers = {};

    const answer = Object.values(list).every((x, index, arr) => {
        if (index === 0) {
            numbers[x] = 1;
            return true;
        }

        if (Math.abs(x - arr[index-1]) > 0) {

            if (numbers[x]) {
                numbers[x]++;
                return checkIfOutOfBound(numbers);
            } else {
                const numbersList = Object.values(numbers);

                if (numbersList.length === 2) {
                    return false;
                } else {
                    numbers[x] = 1;
                    return true;
                }
            }
        } else {
            numbers[x]++;
            return checkIfOutOfBound(numbers);
        }
    });

    return answer ? 'YES' : 'NO';
}

function checkIfOutOfBound(numbersSet) {
    const numbersList = Object.values(numbersSet);

    if (numbersList.length < 2) return true;

    if (numbersList[0] !== 1 && numbersList[1] !== 1) {
        return false;
    } else {
        return true;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = isValid(s);

    ws.write(result + "\n");

    ws.end();
}
