import React from 'react';

import { convertSecondsToMMSS } from '../../utils/helpers';

import { getGame } from '../../utils/localstorage';
import { scoreboardSVG, bestscoreSVG } from '../../utils/images';

const ScoreBoard = ({ playerName }) => {
    let gameDetails = getGame(playerName);

    console.log('SCOREBOARD', playerName);

    return (
        <div className="flex justify-center mt-10 mb-10">
            <div className="w-full mx-2 md:w-2/4 mt-10 border-2">
                <h1 className="uppercase text-center bg-indigo-500 p-2 text-white font-bold tracking-widest">
                    <img src={scoreboardSVG} className="w-10 mx-auto" alt="Score Board" />
                    <br />
                    <span>Scoreboard</span>
                </h1>
                <ul>
                    {gameDetails &&
                        gameDetails.scores.map((score, index) => (
                            <li key={index} className="border-b-2">
                                <div className="inline-flex p-2 bg-white">
                                    <div className="mr-5">
                                        <span className="font-semibold">GAME {index + 1}</span>:{' '}
                                        <span className="font-bold text-green-500">{convertSecondsToMMSS(score)}</span>
                                    </div>
                                    {gameDetails.playerBestScore === score ? (
                                        <>
                                            <img src={bestscoreSVG} className="w-4 mx-auto" alt="Best Score" />
                                            <span className="px-2 text-red-500 uppercase font-bold tracking-wider">Best Score</span>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </li>
                        ))}
                    {/* <span>Some Test</span> */}
                </ul>
            </div>
        </div>
    );
};

export default ScoreBoard;
