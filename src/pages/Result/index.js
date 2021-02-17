import React, { useState } from 'react';
import GameLayout from '../../components/GameLayout';

import { getGame } from '../../utils/localstorage';
import { Redirect } from 'react-router-dom';

import { trophySVG, bestscoreSVG } from '../../utils/images';
import { convertSecondsToMMSS } from '../../utils/helpers';

const Result = (props) => {
    let gameDetails = getGame(props.location.state.playerName);

    const [gameStatus, setGameStatus] = useState('');

    if (gameDetails?.playerName === undefined) return <Redirect to="/" />;

    if (gameStatus === 'play') {
        return (
            <Redirect
                to={{
                    pathname: '/game',
                    state: { playerName: gameDetails.playerName },
                }}
            />
        );
    } else if (gameStatus === 'stop') {
        return <Redirect to="/" />;
    }

    return (
        <GameLayout>
            <div className="w-full text-center pt-10">
                <h1 className="text-xl font-semibold mb-5">Hey ! {gameDetails.playerName}</h1>
                <img src={trophySVG} className="w-24 mx-auto" alt="Trophy" />
                <h1 className="uppercase my-3">Your Score Is</h1>
                <h1 className="text-6xl text-yellow-500">{convertSecondsToMMSS(gameDetails.playerScore)}</h1>
                <button
                    onClick={() => setGameStatus('play')}
                    className="bg-yellow-500 text-white rounded px-5 py-2 mt-10 uppercase font-bold tracking-widest">
                    Play Again
                </button>
                <br />
                <button
                    onClick={() => setGameStatus('stop')}
                    className="bg-red-500 text-white rounded px-5 py-2 mt-10 uppercase font-bold tracking-widest">
                    Stop
                </button>
            </div>
        </GameLayout>
    );
};

export default Result;
