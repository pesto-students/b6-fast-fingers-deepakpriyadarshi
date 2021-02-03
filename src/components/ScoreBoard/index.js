import React, { useState, useEffect } from 'react';
import { getPlayerScores } from '../../utils/localstorage';

import { convertSecondsToMMSS } from '../../utils/game';

function ScoreBoard({ player }) {
    const [playerScores, setplayerScores] = useState([]);

    useEffect(() => {
        let savedPlayerScores = getPlayerScores(player.playerName);

        savedPlayerScores =
            savedPlayerScores === null || savedPlayerScores === undefined || !Array.isArray(savedPlayerScores) ? [] : savedPlayerScores;

        setplayerScores(savedPlayerScores);
    }, [player]);

    return (
        <div className="scoreboard-box">
            <div className="text-center">SCOREBOARD</div>
            <hr></hr>
            <div className="content">
                <ul>
                    {playerScores.map((scoreData, index) => (
                        <li key={index} className={`game-score-history ${player.bestScoreIndex === index ? 'bestscore' : ''}`}>
                            GAME {index + 1}: {convertSecondsToMMSS(scoreData.time)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ScoreBoard;
