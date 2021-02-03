import React, { useState, useEffect } from 'react';
import { saveWords, getWords, getPlayerScores, savePlayerScores } from '../../utils/localstorage';
import { getNewWord, currentDate, convertSecondsToMMSS } from '../../utils/game';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Countdown from 'react-countdown';

import LevelIcon from '../../images/icons/gamepad.png';
import playerIcon from '../../images/icons/person.png';
import playIcon from '../../images/icons/play.png';

import dictionary from '../../data/dictionary.json';

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
        currentScore: 0,
        highScore: 0,
    };

    const [game, setGame] = useState(initialGameState);
    const [timerKey, setTimerKey] = useState(0);

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
    }, []);

    const validateWord = (inputTarget) => {
        let allWords = {
            easy: getWords('easywords'),
            medium: getWords('mediumwords'),
            hard: getWords('hardwords'),
        };

        const playerWord = inputTarget.value.toUpperCase();

        if (playerWord === game.currentWord) {
            const difficultyFactor = game.difficultyFactor + 0.1;

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

            setTimerKey(timerKey + 1);
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
        let bsIndex = 0;
        if (scores === null || scores === undefined || scores.length === 0) {
            scores = [];
        } else {
            //
        }
        scores.push({
            date: currentDate(),
            time: game.currentScore,
        });

        savePlayerScores(game.playerName, scores);
        setPlayer({ ...player, page: 'end', latestScore: game.currentScore, bestScoreIndex: bsIndex });
    };

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
                        <CountdownCircleTimer
                            isPlaying
                            key={timerKey}
                            rotation="counterclockwise"
                            duration={game.currentWordTime}
                            colors={[
                                ['#28a745', 0.33],
                                ['#ffa500', 0.33],
                                ['#e50914', 0.33],
                            ]}
                            onComplete={(totalElapsedTime) => {
                                completeGame();
                                return [false, 0];
                            }}>
                            {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer>
                        <br />
                        <Countdown
                            key={timerKey + 1}
                            date={Date.now() + game.currentWordTime * 1000}
                            onTick={() => {
                                setGame({ ...game, currentScore: game.currentScore + 1 });
                            }}
                            className="all-hidden"
                        />
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
