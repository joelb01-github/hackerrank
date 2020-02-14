const stuff = 'asvkugfiugsalddlasguifgukvsa';

console.log(alternate(stuff));

function alternate(s) {
    const list = s.split('');
    
    if (list.length < 2) return 0;

    const lettersMapping = {}; // {letter} -- 1 => banned
    const pairsMapping = {};  // {letter1_letter2: {letter}} -- letter1 < letter2 and 1 => banned
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

    const validLetters = Object.keys(lettersMapping).filter(letter => lettersMapping[letter] === 0);

    list.forEach(baseLetter => {
        if (lettersMapping[baseLetter] === 1) return;

        const tempMapping = {}; // {letter: {tempScore, lastLetter}}

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

        if (lettersMapping[baseLetter] === 1) return;

        lettersMapping[baseLetter] = 1;

        Object.values(tempMapping).forEach(obj => {
            if (obj.tempScore > score) score = obj.tempScore;
        });
    });

    return score;
}