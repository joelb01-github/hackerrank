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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function twoStacks(x, a, b) {
    return getMaxScore(x, a, b, 0, 0);
}

function getMaxScore(x, a, b, score, sum) {
    let scoreA = score;
    let scoreB = score;

    if (sum + a[0] <= x) {
        scoreA = getMaxScore(x, a.slice(1), b, score + 1, sum + a[0]);
    } 
    
    if (sum + b[0] <= x) {
        scoreB = getMaxScoreLinear(x, b.slice(1), score + 1, sum + b[0]);
    }

    return Math.max(scoreA, scoreB);
}

function getMaxScoreLinear(x, arr, score, sum) {
    let newScore = score;

    if (sum + arr[0] <= x) {
        newScore = getMaxScoreLinear(x, arr.slice(1), score + 1, sum + arr[0]);
    }

    return newScore;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const g = parseInt(readLine(), 10);

    for (let gItr = 0; gItr < g; gItr++) {
        const nmx = readLine().split(' ');

        const n = parseInt(nmx[0], 10);

        const m = parseInt(nmx[1], 10);

        const x = parseInt(nmx[2], 10);

        const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

        const b = readLine().split(' ').map(bTemp => parseInt(bTemp, 10));

        let result = twoStacks(x, a, b);

        ws.write(result + "\n");
    }

    ws.end();
}
