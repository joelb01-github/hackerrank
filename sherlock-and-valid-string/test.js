'use strict';

const input = 'aaaaabc';
console.log(isValid(input));

function isValid(s) {
    const list = {};

    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => list[letter] = 0);

    s.split('').forEach(letter => list[letter]++);

    Object.keys(list).forEach(letter => {
        if (list[letter] === 0) delete list[letter];
    });

    let numbers = {};

    console.log('list:', list);

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
                    if (canBeInserted(x, numbers)) {
                        numbers[x] = 1;
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        } else {
            numbers[x]++;
            return checkIfOutOfBound(numbers);
        }
    });

    return answer ? 'YES' : 'NO';
}

function canBeInserted(x, numbers) {
    const occurence = Object.keys(numbers)[0];
    const occurence2 = numbers[occurence];

    if (Math.abs(x - occurence) > 1) {
        if (x === 1 || occurence === 1) {
            return true;
        } else {
            return false;
        }
    } else {
        if (occurence2 > 1) {
            if (x === 1) {
                return true;
            } else {
                if (x > occurence) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    }
}

function checkIfOutOfBound(numbersSet) {
    const numbersList = Object.values(numbersSet);
    const occurence = Object.keys(numbersSet);

    if (numbersList.length < 2) return true;

    console.log(numbersSet);

    if (Math.abs(Number(occurence[0]) - Number(occurence[1])) > 1) {
        if (Number(occurence[0]) === 1 || Number(occurence === 1)) {
            return false;
        } else {
            return true;
        }
    } else {
        if (numbersList[0] !== 1 && numbersList[1] !== 1) {
            return false;
        } else {
            return true;
        }
    }
}

