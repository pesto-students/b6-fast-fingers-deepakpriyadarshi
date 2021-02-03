/* Dictionary Utils */
// const saveEasywords = (easyWords) => window.localStorage.setItem('easywords', JSON.stringify(easyWords));
// const getEasywords = () => JSON.parse(window.localStorage.getItem('easywords'));

// const saveMediumwords = (mediumWords) => window.localStorage.setItem('mediumwords', JSON.stringify(mediumWords));
// const getMediumwords = () => JSON.parse(window.localStorage.getItem('mediumwords'));

// const saveHardwords = (hardWords) => window.localStorage.setItem('hardwords', JSON.stringify(hardWords));
// const getHardwords = () => JSON.parse(window.localStorage.getItem('hardwords'));

/* Game Score Utils */

export const saveWords = (wordType, wordData) => window.localStorage.setItem(wordType, JSON.stringify(wordData));
export const getWords = (wordType) => JSON.parse(window.localStorage.getItem(wordType));

export const savePlayerScores = (playerName, playerScores) => window.localStorage.setItem(playerName, JSON.stringify(playerScores));
export const getPlayerScores = (playerName) => JSON.parse(window.localStorage.getItem(playerName));
export const clearPlayerScores = (playerName) => window.localStorage.removeItem(playerName);
