export const getNewWord = ({ easy, medium, hard }, difficultyFactor = null) => {
    if (difficultyFactor >= 1.5 && difficultyFactor < 2) {
        return medium[Math.round(Math.random() * (medium.length - 1))].toUpperCase();
    }
    if (difficultyFactor < 1.5) {
        return easy[Math.round(Math.random() * (easy.length - 1))].toUpperCase();
    }

    return hard[Math.round(Math.random() * (hard.length - 1))].toUpperCase();
};

export const convertSecondsToMMSS = (seconds) => {
    let mm = Math.floor(seconds / 60);
    let ss = seconds % 60;

    if (ss < 10) ss = `0${ss}`;
    if (mm < 10) mm = `0${mm}`;

    return `${mm}:${ss}`;
};

export const currentDate = () => {
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return (today = mm + '-' + dd + '-' + yyyy);
};
