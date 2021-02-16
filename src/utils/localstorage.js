import { getNewWord } from './helpers';

export const createGame = ({ gameMode, gameDifficulty, gameDifficultyFactor, playerName }) => {
    const newWord = getNewWord(gameDifficulty).toUpperCase();
    let timeForWord = Math.round(newWord.length / gameDifficultyFactor);
    timeForWord = Math.max(timeForWord, 2);

    let newGame = {
        currentWord: newWord,
        currentWordTime: timeForWord,
        playerName: playerName,
        playerScore: 0,
        playerBestScore: 0,
        gameMode: gameMode || 'guest',
        gameDifficulty: gameDifficulty || 'easy',
        gameDifficultyFactor: gameDifficultyFactor,
        scores: [],
    };

    localStorage.setItem(`game-${playerName}`, JSON.stringify(newGame));
};

export const getGame = (playerName) => JSON.parse(localStorage.getItem(`game-${playerName}`));
export const saveGame = (gameData) => localStorage.setItem(`game-${gameData.playerName}`, JSON.stringify(gameData));

export const saveWords = (wordType, wordData) => window.localStorage.setItem(wordType, JSON.stringify(wordData));
export const getWords = (wordType) => JSON.parse(window.localStorage.getItem(wordType));
