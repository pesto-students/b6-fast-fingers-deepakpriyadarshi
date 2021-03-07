import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getPlayerScores } from '../../utils/api';

import { convertSecondsToMMSS } from '../../utils/helpers';

import { scoreboardSVG } from '../../utils/images';

const PlayerScoreBoard = () => {
    const [pageNo, setPage] = useState(0);

    const { status: playerScoreStatus, data: playerScoreData } = useQuery(['playerscores', pageNo], getPlayerScores);

    return (
        <div className="flex justify-center mb-10">
            <div className="w-full mx-2 md:w-2/4 mt-10 border-2">
                <div className="inline-flex w-full bg-indigo-500 p-2 justify-center">
                    <img src={scoreboardSVG} className="w-10" alt="Score Board" />
                    <span className="ml-2 uppercase text-white font-bold tracking-widest my-auto">Scoreboard</span>
                </div>
                {playerScoreStatus === 'loading' && 'Loading Scores ...'}
                {playerScoreStatus === 'error' && 'Error Loading Scores ...'}
                {playerScoreStatus === 'success' && (
                    <ul>
                        {playerScoreData.data.map((scoreData, scoreIndex) => (
                            <li key={scoreIndex} className="border-b-2">
                                <div className="inline-flex p-2 bg-white">
                                    <div className="mr-2">
                                        <span className="font-semibold">GAME {scoreData.scoreID}</span> : You scored {'   '}
                                        <span className="font-bold text-green-500 ml-2"> {convertSecondsToMMSS(scoreData.score)}</span>
                                        <span className="ml-2"> on {scoreData.createdOn.substr(0, 10)}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PlayerScoreBoard;
