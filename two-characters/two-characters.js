'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function alternate(s) {
    const list = s.split('');
    
    if (list.length < 2) return 0;

    const lettersMapping = {}; 
    // {letter: int} -- 1 => banned
    const pairsMapping = {}; 
    // {letter1_letter2: {letter: int}} -- letter1 < letter2 and 1 => banned
    let score = 0;

    list.forEach((letter, index) => {
        if (index > 0 && list[index-1] === letter) {
            lettersMapping[letter] = 1;
            return;
        }

        if (lettersMapping[letter] && lettersMapping[letter] === 1) {
            return;
        }

        lettersMapping[letter] = 0;
    });

    console.log('lettersMapping',lettersMapping);

    const validLetters = Object.keys(lettersMapping).filter(letter => lettersMapping[letter] === 0);

    console.log('validLetters',validLetters);

    list.forEach(baseLetter => {
        if (lettersMapping[baseLetter] === 1) return;

        const tempMapping = {};
        // {letter: {tempScore: int, lastLetter: string}

        validLetters.forEach(letter => {
            if (letter !== baseLetter) {
                tempMapping[letter] = {
                    tempScore: 0,
                    lastLetter: ''
                };
            }
        });

        list.every((letter, index) => {
            const pair = baseLetter < letter 
                ? `${baseLetter}_${letter}`
                : `${letter}_${baseLetter}`;

            if (lettersMapping[letter] === 1) return true;
            if (pairsMapping[pair] === 1) return true;

            if (letter === baseLetter) {
                if (index > 0 && list[index-1] === baseLetter) {
                    lettersMapping[letter] = 1;
                    return false;
                }

                Object.keys(tempMapping).forEach(letterMap => {
                    const pair2 = baseLetter < letterMap 
                        ? `${baseLetter}_${letterMap}`
                        : `${letterMap}_${baseLetter}`;

                    if (pairsMapping[pair2] === 1) return true;

                    if (tempMapping[letterMap].lastLetter === letter) {
                        pairsMapping[pair2] = 1;
                        tempMapping[letterMap].tempScore = 0;

                        return true;
                    }

                    tempMapping[letterMap].tempScore++;
                    tempMapping[letterMap].lastLetter = letter;
                });

                return true;
            }

            if (tempMapping[letter].lastLetter === letter) {
                tempMapping[letter].tempScore = 0;
                pairsMapping[pair] = 1;
                return true;
            }

            tempMapping[letter].lastLetter = letter;
            tempMapping[letter].tempScore++;
            return true;
        });

        console.log('tempMapping for ' + baseLetter + ' -- after',tempMapping);

        if (lettersMapping[baseLetter] === 1) return;

        lettersMapping[baseLetter] = 1;

        Object.values(tempMapping).forEach(obj => {
            if (obj.tempScore > score) score = obj.tempScore;
        });
    });

    return score;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const l = parseInt(readLine().trim(), 10);

    const s = readLine();

    const result = alternate(s);

    ws.write(result + '\n');

    ws.end();
}
