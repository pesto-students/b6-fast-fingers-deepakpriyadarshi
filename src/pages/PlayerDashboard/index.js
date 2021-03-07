import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import GameLayout from '../../components/GameLayout';

import { convertSecondsToMMSS, isUserLogged, logoutPlayer } from '../../utils/helpers';
import { selectData } from '../../utils/constants';
import { createGame } from '../../utils/localstorage';

import SelectList from '../../components/SelectList';
import { getPlayerDetails, getPlayerScoreStats } from '../../utils/api';
import { useQuery } from 'react-query';
import PlayerScoreBoard from '../../components/PlayerScoreboard';

const PlayerDashboard = () => {
    const [gameDifficulty, setGameDifficulty] = useState('easy');
    const [redirectToGame, setRedirectToGame] = useState(false);

    const [playerData, setPlayerData] = useState('');

    const { status: playerStatsStatus, data: playerStatsData } = useQuery('playerscorestats', getPlayerScoreStats);

    useEffect(() => {
        getPlayerDetails()
            .then((result) => {
                if (result.status === 'success') {
                    setPlayerData(result.data);
                } else {
                    logoutPlayer();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (!isUserLogged()) return <Redirect to="/login" />;

    if (redirectToGame) {
        return (
            <Redirect
                to={{
                    pathname: '/game',
                    state: { playerName: playerData.name },
                }}
            />
        );
    }

    const starPlayerGame = () => {
        createGame({
            gameMode: 'player',
            gameDifficulty: gameDifficulty,
            gameDifficultyFactor: 1,
            playerName: playerData.name,
        });
        setRedirectToGame(true);
        console.log('Start Player Game');
    };

    return (
        <GameLayout>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3">
                    <div className="w-full text-center pt-10">
                        <h1 className="font-bold text-2xl text-gray-600">
                            HI <span className="uppercase">{playerData.name} !</span>
                        </h1>
                        <SelectList
                            onChange={(ev) => setGameDifficulty(ev.target.value)}
                            placeholder="Select Difficulty"
                            label=" "
                            data={selectData}
                        />
                        <button onClick={starPlayerGame} className="bg-green-500 text-white rounded px-5 py-2 mt-10">
                            Play New Game
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-2/3 ">
                    <div className="flex justify-evenly min-w-full text-center pt-10">
                        <div className="w-1/3 p-5">
                            <span className="text-5xl md:text-7xl">
                                {playerStatsStatus === 'loading' && '...'}
                                {playerStatsStatus === 'error' && 'NA'}
                                {playerStatsStatus === 'success' && playerStatsData.data.totalGamePlayed}
                            </span>
                            <hr className="mt-3 mb-3 border-pink-600" />
                            <span className="uppercase text-pink-600 font-bold text-xs md:text-base">Games Played</span>
                        </div>
                        <div className="w-1/3 p-5">
                            <span className="text-5xl md:text-7xl">
                                {playerStatsStatus === 'loading' && '...'}
                                {playerStatsStatus === 'error' && 'NA'}
                                {playerStatsStatus === 'success' && convertSecondsToMMSS(Math.floor(playerStatsData.data.averageGameTime))}
                            </span>
                            <hr className="mt-3 mb-3 border-green-600" />
                            <span className="uppercase text-green-600 font-bold text-xs md:text-base">
                                Avg Game Time <small>(MM:SS)</small>
                            </span>
                        </div>
                        <div className="w-1/3 p-5">
                            <span className="text-5xl md:text-7xl text-blue-600">
                                {playerStatsStatus === 'loading' && '...'}
                                {playerStatsStatus === 'error' && 'NA'}
                                {playerStatsStatus === 'success' && playerStatsData.data.bestScore}
                            </span>
                            <hr className="mt-3 mb-3 border-blue-600" />
                            <span className="uppercase text-blue-600 font-bold text-xs md:text-base">Best Score</span>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="mt-10" />
            <PlayerScoreBoard />
        </GameLayout>
    );
};

export default PlayerDashboard;
