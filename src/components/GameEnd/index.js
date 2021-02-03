import React from 'react';
import { convertSecondsToMMSS } from '../../utils/game';
import { clearPlayerScores } from '../../utils/localstorage';

import LevelIcon from '../../images/icons/gamepad.png';
import playerIcon from '../../images/icons/person.png';

import stopIcon from '../../images/icons/cross.png';
import replayIcon from '../../images/icons/reload.png';

import ScoreBoard from '../ScoreBoard';

function Game({ player, setPlayer }) {
    const playAgain = () => {
        setPlayer({ ...player, page: 'game' });
    };

    const startAgain = () => {
        clearPlayerScores(player.playerName);
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
                </div>
            </div>
            <div className="row game-block">
                <div className="col-md-3">
                    <ScoreBoard player={player} />
                </div>
                <div className="col-md-6 text-center">
                    <div className="final-score">
                        SCORE
                        <br />
                        {convertSecondsToMMSS(player.latestScore)}
                    </div>
                    <br />
                    <button className="replay-game-btn" onClick={playAgain}>
                        <img src={replayIcon} alt="Replay Game" className="img-fluid player-image" />
                        PLAY AGAIN
                    </button>
                    <br />
                    <button className="stop-game-btn" onClick={startAgain}>
                        <img src={stopIcon} alt="Stop Game" className="img-fluid player-image" />
                        QUIT
                    </button>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
}

export default Game;
