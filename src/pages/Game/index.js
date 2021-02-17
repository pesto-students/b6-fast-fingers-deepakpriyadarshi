import React, { useRef, useState, useEffect } from 'react';
import GameLayout from '../../components/GameLayout';
import WordTimer from '../../components/WordTimer';

import { getGame, saveGame } from '../../utils/localstorage';
import { convertSecondsToMMSS, getNewWord } from '../../utils/helpers';
import { Redirect } from 'react-router-dom';
import TextInput from '../../components/TextInput';

const Game = (props) => {
    let gameDetails = getGame(props.location.state.playerName);

    const gameTimerId = useRef();
    const gameScore = useRef(0);

    const [gameTime, setGameTime] = useState(0);
    const [redirectToResult, setRedirectToResult] = useState(false);
    const [wordTimerKey, setWordTimerKey] = useState(0);

    const [playerInput, setPlayerInput] = useState('');
    const [currentWord, setCurrentWord] = useState(gameDetails.currentWord);
    const [currentWordTime, setCurrentWordTime] = useState(gameDetails.currentWordTime);
    const [gameDifficulty, setGameDifficulty] = useState(gameDetails.gameDifficulty);
    const [gameDifficultyFactor, setGameDifficultyFactor] = useState(gameDetails.gameDifficultyFactor);

    useEffect(() => {
        gameTimerId.current = setInterval(() => {
            gameScore.current += 1;
            setGameTime((prevTime) => (prevTime += 1));
        }, 1000);
        return () => clearInterval(gameTimerId.current);
    }, []);

    if (gameDetails?.playerName === undefined) return <Redirect to="/" />;

    if (redirectToResult) {
        return (
            <Redirect
                to={{
                    pathname: '/result',
                    state: { playerName: gameDetails.playerName },
                }}
            />
        );
    }

    const validateWord = (userWordInput) => {
        let userWord = userWordInput.value.toUpperCase();

        setPlayerInput(userWord);

        if (currentWord === userWord) {
            const newDifficultyFactor = gameDifficultyFactor + 0.1;

            let newDifficulty;

            if (newDifficultyFactor >= 2) newDifficulty = 'hard';
            else if (newDifficultyFactor < 1.5) newDifficulty = 'easy';
            else newDifficulty = 'medium';

            const newWord = getNewWord(newDifficulty);
            let timeForWord = Math.round(newWord.length / newDifficultyFactor);
            timeForWord = Math.max(timeForWord, 2);

            setCurrentWord(newWord);
            setCurrentWordTime(timeForWord);

            setGameDifficulty(newDifficulty);
            setGameDifficultyFactor(newDifficultyFactor);

            setWordTimerKey((prevWordTimerKey) => (prevWordTimerKey += 1));
            userWordInput.value = '';
        }
    };

    const endGame = () => {
        gameDetails.playerBestScore = gameScore.current > gameDetails.playerBestScore ? gameScore.current : gameDetails.playerBestScore;
        gameDetails.playerScore = gameScore.current;
        gameDetails.scores.push(gameScore.current);

        saveGame(gameDetails);

        setRedirectToResult(true);
        clearInterval(gameTimerId.current);
    };

    const WordComponent = () => {
        const currentWordCharacter = currentWord.split('');
        const playerInputCharacters = playerInput.split('');
        return (
            <div className="new-word">
                {currentWordCharacter.map((char, i) => {
                    let color;
                    if (i < playerInput.length) {
                        color = char === playerInputCharacters[i] ? '#54ba18' : '#445298';
                    }
                    return (
                        <span key={i} style={{ color: color }}>
                            {char}
                        </span>
                    );
                })}
            </div>
        );
    };

    return (
        <GameLayout>
            <div className="flex justify-between p-5">
                <div>
                    <h1 className="">{gameDetails.playerName}</h1>
                    <h1 className="uppercase">{gameDifficulty}</h1>
                </div>

                <h1 className="">SCORE: {convertSecondsToMMSS(gameTime)}</h1>
            </div>
            <div>Welcome To Game Page</div>

            <hr />
            <div>Word timer</div>
            <WordTimer key={wordTimerKey} time={currentWordTime} onComplete={() => endGame()} className="" />
            <div className="text-center">
                <h1 className="text-3xl font-extrabold">
                    <WordComponent />
                </h1>
                <TextInput
                    onChange={(ev) => validateWord(ev.target)}
                    label=" "
                    style={{ textTransform: 'uppercase', textAlign: 'center' }}
                    className="border-red-500"
                />
            </div>
        </GameLayout>
    );
};

export default Game;
