import React from 'react';

import { convertSecondsToMMSS } from '../../utils/helpers';

import { getGame } from '../../utils/localstorage';
import { scoreboardSVG, bestscoreSVG } from '../../utils/images';

const ScoreBoard = ({ playerName }) => {
    let gameDetails = getGame(playerName);

    console.log('SCOREBOARD', playerName);

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full mx-2 md:w-2/4 text-center mt-10 border-2">
                <h1 className="uppercase bg-indigo-500 p-2 text-white font-bold tracking-widest">
                    <img src={scoreboardSVG} className="w-10 mx-auto" alt="Score Board" />
                    <br />
                    <span>Scoreboard</span>
                </h1>
                <ul>
                    {gameDetails &&
                        gameDetails.scores.map((score, index) => (
                            <li key={index}>
                                GAME {index + 1}: {convertSecondsToMMSS(score)}
                            </li>
                        ))}
                    {/* <span>Some Test</span> */}
                </ul>
            </div>
        </div>
    );
};

export default ScoreBoard;
