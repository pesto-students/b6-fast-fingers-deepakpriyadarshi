import wordsDictionary from '../data/dictionary.json';
import { selectData } from './constants';
import { getWords, saveWords } from './localstorage';

export const convertSecondsToMMSS = (seconds) => {
    let mm = Math.floor(seconds / 60);
    let ss = seconds % 60;

    if (ss < 10) ss = `0${ss}`;
    if (mm < 10) mm = `0${mm}`;

    return `${mm}:${ss}`;
};

export const prepareDictionary = () => {
    if (
        getWords('easywords') === undefined ||
        getWords('easywords') === null ||
        getWords('easywords').length === 0 ||
        getWords('mediumwords') === undefined ||
        getWords('mediumwords') === null ||
        getWords('mediumwords').length === 0 ||
        getWords('hardwords') === undefined ||
        getWords('hardwords') === null ||
        getWords('hardwords').length === 0
    ) {
        console.log('Preparing Dictionary');

        const easyWords = [],
            mediumWords = [],
            hardWords = [];

        for (const word of wordsDictionary) {
            if (word.length <= 4) {
                easyWords.push(word);
            } else if (word.length >= 5 && word.length <= 8) {
                mediumWords.push(word);
            } else if (word.length > 8) {
                hardWords.push(word);
            }
        }

        easyWords.sort((a, b) => a.length - b.length);
        mediumWords.sort((a, b) => a.length - b.length);
        hardWords.sort((a, b) => a.length - b.length);

        saveWords('easywords', easyWords);
        saveWords('mediumwords', mediumWords);
        saveWords('hardwords', hardWords);
        console.log('Dictionary Prepared');
    } else {
        console.log('Dictionary Exist');
    }
};

export const getNewWord = (difficulty) => {
    let wordData = getWords(`${difficulty}words`);

    return wordData[Math.round(Math.random() * (wordData.length - 1))].toUpperCase();
};

export const isUserLogged = () => {
    let playerToken = window.localStorage.getItem('player');

    return playerToken ? playerToken : false;
};

export const getPlayerAuthToken = () => {
    let playerToken = window.localStorage.getItem('player');

    return playerToken ? playerToken : 'NA';
};

export const logoutPlayer = () => {
    window.localStorage.removeItem('player');
    window.location.href = '/login';
};

export const difficultyToFactor = (difficulty) => {
    for (let diff_i = 0; diff_i < selectData.length; diff_i += 1) {
        if (selectData[diff_i].value === difficulty) {
            return selectData[diff_i].factor;
        }
    }

    return 1;
};
