import React, { useState, useEffect, useRef } from 'react';
import { saveWords, getWords, getPlayerScores, savePlayerScores } from '../../utils/localstorage';
import { getNewWord, currentDate, convertSecondsToMMSS } from '../../utils/game';

import LevelIcon from '../../images/icons/gamepad.png';
import playerIcon from '../../images/icons/person.png';
import playIcon from '../../images/icons/play.png';

import dictionary from '../../data/dictionary.json';

import Timer from '../Timer';
import ScoreBoard from '../ScoreBoard';

function Game({ player, setPlayer }) {
    const initialGameState = {
        playerName: player.playerName,
        difficulty: player.difficulty,
        difficultyFactor: player.difficultyFactor,
        playerInput: '',
        currentWord: 'DEEPAK',
        currentWordTime: 10,
        previousWordTime: 10,
        startTimer: false,
        gameStatus: 'begin',
        currentScore: 0,
    };

    const [game, setGame] = useState(initialGameState);
    const [timer, setTimer] = useState({
        timeLimit: initialGameState.currentWordTime,
        timeLeft: initialGameState.currentWordTime,
        timePassed: 0,
        timeInterval: null,
    });

    /* Prepare Dictionary Here */
    useEffect(() => {
        const easyWords = [],
            mediumWords = [],
            hardWords = [];

        for (const word of dictionary) {
            if (word.length <= 4) {
                easyWords.push(word);
            } else if (word.length >= 5 && word.length <= 8) {
                mediumWords.push(word);
            } else if (word.length > 8) {
                hardWords.push(word);
            }
        }

        saveWords('easywords', easyWords);
        saveWords('mediumwords', mediumWords);
        saveWords('hardwords', hardWords);

        /* Set Current Word */
        // let allWords = {
        //     easy: getWords('easywords'),
        //     medium: getWords('mediumwords'),
        //     hard: getWords('hardwords'),
        // };

        // let newGameWord = getNewWord(allWords, game.difficultyFactor);

        // setGame({
        //     ...game,
        //     currentWord: newGameWord,
        //     currentWordTime: Math.max(Math.round(newGameWord.length / game.difficultyFactor), 2),
        //     startTimer: true,
        // });

        // console.log('NEW WORD SELECTED', newGameWord);
        // console.log('GAME', game);

        // return () => {
        //     console.log('DISMOUNTED');
        // };
    }, []);

    let timeIntervalRef = useRef();

    const countDown = () => {
        console.log('Counting Down');
        if (timer.timeLeft <= 0) {
            clearInterval(timeIntervalRef.current);
            completeGame();
        }
        setTimer({ ...timer, timeLeft: timer.timeLeft - 1 });
    };

    useEffect(() => {
        const intervalID = setTimeout(() => {
            countDown();
        }, 1000);

        timeIntervalRef.current = intervalID;
        return () => clearInterval(timeIntervalRef.current);
    }, [countDown]);

    const validateWord = (inputTarget) => {
        let allWords = {
            easy: getWords('easywords'),
            medium: getWords('mediumwords'),
            hard: getWords('hardwords'),
        };

        const playerWord = inputTarget.value.toUpperCase();

        if (playerWord === game.currentWord) {
            const difficultyFactor = game.difficultyFactor + 0.01;

            let difficultyLevel;
            if (difficultyFactor >= 2) difficultyLevel = 'hard';
            else if (difficultyFactor < 1.5) difficultyLevel = 'easy';
            else difficultyLevel = 'medium';

            if (game.difficultyLevel !== difficultyLevel) console.log('level changed!');

            const newWord = getNewWord(allWords, difficultyFactor);
            let timeForWord = Math.round(newWord.length / difficultyFactor);
            timeForWord = Math.max(timeForWord, 2);

            setGame({
                ...game,
                currentWord: newWord,
                playerInput: '',
                currentWordTime: timeForWord,
                difficulty: difficultyLevel,
                difficultyFactor: parseFloat(difficultyFactor.toFixed(2)),
            });
            inputTarget.value = '';

            setTimer({ ...timer, timeLimit: timeForWord, timeLeft: timeForWord, timePassed: 0, timeInterval: null });
        } else {
            setGame({ ...game, playerInput: playerWord });
        }
    };

    const wordComponent = () => {
        const currentWordCharacter = game.currentWord.split('');
        const playerInputCharacters = game.playerInput.split('');
        return (
            <div className="new-word">
                {currentWordCharacter.map((char, i) => {
                    let color;
                    if (i < game.playerInput.length) {
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

    const completeGame = () => {
        let scores = getPlayerScores(game.playerName);
        if (scores === null || scores === undefined || scores.length === 0) {
            scores = [];
        }
        scores.push({
            date: currentDate(),
            time: game.currentScore,
        });

        savePlayerScores(game.playerName, scores);
        setPlayer({ ...player, page: 'end', latestScore: game.currentScore });
    };

    /* Timer Start Here */
    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 10;
    const ALERT_THRESHOLD = 5;

    const COLOR_CODES = {
        info: { color: 'green' },
        warning: { color: 'orange', threshold: WARNING_THRESHOLD },
        alert: { color: 'red', threshold: ALERT_THRESHOLD },
    };

    let remainingPathColor = COLOR_CODES.info.color;
    /* Timer Ends Here */

    return (
        <div className="game">
            <div className="row">
                <div className="col-sm-9">
                    <img src={playerIcon} alt="Player" className="img-fluid player-image" /> {game.playerName}
                    <br />
                    <img src={LevelIcon} alt="Player" className="img-fluid player-image" /> {game.difficulty.toUpperCase()}
                    <br />
                </div>
                <div className="col-sm-3">
                    <h2>Fast Fingers</h2>
                    <img src={playIcon} alt="Player" className="img-fluid player-image" />
                    SCORE {convertSecondsToMMSS(game.currentScore)}
                    <br />
                </div>
            </div>
            <div className="row game-block">
                <div className="col-md-3">
                    <ScoreBoard player={player} />
                </div>
                <div className="col-md-6">
                    <div id="timer">
                        <div className="base-timer">
                            <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <g className="base-timer__circle">
                                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                                    <path
                                        id="base-timer-path-remaining"
                                        htmlstroke-dasharray="283"
                                        className={`base-timer__path-remaining ${remainingPathColor}`}
                                        d="M 50, 50m -45, 0a 45,45 0 1,0 90,0a 45,45 0 1,0 -90,0"></path>
                                </g>
                            </svg>
                            <span id="base-timer-label" className="base-timer__label">
                                {convertSecondsToMMSS(timer.timeLeft)}
                            </span>
                        </div>
                    </div>
                    <br />
                    <center>{wordComponent()}</center>
                    <br />
                    <input type="text" name="playerWord" placeholder="" onInput={(ev) => validateWord(ev.target)} />
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
}

export default Game;
