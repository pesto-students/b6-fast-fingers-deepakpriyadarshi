import React, { useState, useEffect, useRef } from 'react';
import { saveWords, getWords, getPlayerScores, savePlayerScores } from '../../utils/localstorage';
import { getNewWord, currentDate, convertSecondsToMMSS } from '../../utils/game';

import LevelIcon from '../../images/icons/gamepad.png';
import playerIcon from '../../images/icons/person.png';
import playIcon from '../../images/icons/play.png';

import ScoreBoard from '../ScoreBoard';

function Game({ player, setPlayer }) {
    const playAgain = () => {
        setPlayer({ ...player, page: 'game' });
    };

    const startAgain = () => {
        setPlayer({ ...player, page: 'home' });
    };

    return (
        <div className="game">
            <div className="row">
                <div className="col-sm-9">
                    <img src={playerIcon} alt="Player" className="img-fluid player-image" /> {player.playerName}
                    <br />
                    <img src={LevelIcon} alt="Player" className="img-fluid player-image" /> {player.difficulty.toUpperCase()}
                    <br />
                </div>
                <div className="col-sm-3">
                    <h2>Fast Fingers</h2>
                    <img src={playIcon} alt="Player" className="img-fluid player-image" />
                </div>
            </div>
            <div className="row game-block">
                <div className="col-md-3">
                    <ScoreBoard player={player} />
                </div>
                <div className="col-md-6">
                    <center>{convertSecondsToMMSS(player.latestScore)}</center>
                    <button onClick={startAgain}>QUIT</button>
                    <button onClick={playAgain}>PLAY AGAIN</button>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
}

export default Game;
