import React, { useState } from 'react';
import Home from '../Home';
import Game from '../Game';
import GameEnd from '../GameEnd';

function Main() {
    const initialPlayerState = {
        page: 'home',
        playerName: '',
        playerNameError: false,
        difficulty: 'easy',
        difficultyError: false,
        difficultyFactor: 1,
        latestScore: 0,
    };

    const [player, setPlayer] = useState(initialPlayerState);

    switch (player.page) {
        case 'home':
            return <Home player={player} setPlayer={setPlayer} />;
        case 'game':
            return <Game player={player} setPlayer={setPlayer} />;
        case 'end':
            return <GameEnd player={player} setPlayer={setPlayer} />;
        default: {
        }
    }
}

export default Main;
