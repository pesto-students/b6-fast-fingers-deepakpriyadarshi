import React, { useState } from 'react';
import GameLayout from '../../components/GameLayout';

import { getGame } from '../../utils/localstorage';
import { convertSecondsToMMSS } from '../../utils/helpers';
import { Redirect } from 'react-router-dom';

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
            {gameDetails.playerName} : {gameDetails.playerScore}
            <br />
            <div className="flex justify-evenly">
                <button onClick={() => setGameStatus('play')} className="bg-yellow-500 text-white rounded px-5 py-2 mt-10">
                    Play Again
                </button>
                <button onClick={() => setGameStatus('stop')} className="bg-red-500 text-white rounded px-5 py-2 mt-10">
                    Stop Playing
                </button>
            </div>
        </GameLayout>
    );
};

export default Result;
