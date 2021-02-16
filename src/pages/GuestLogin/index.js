import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import GameLayout from '../../components/GameLayout';
import SelectList from '../../components/SelectList';
import TextInput from '../../components/TextInput';

import { logoIconPNG, logoNamePNG } from '../../utils/images';

const GuestLogin = () => {
    const randomGuestName = `Guest-${new Date().getTime()}`;

    const [guestName, setGuestName] = useState(randomGuestName);
    const [guestNameError, setGuestNameError] = useState('');

    const [redirectToGame, setRedirectToGame] = useState(false);

    if (redirectToGame) return <Redirect to="/game" />;

    const startGame = () => {
        if (guestName.length <= 0) {
            setGuestNameError('Enter Your Name');
        } else {
            setRedirectToGame(true);
            console.log('Start Game');
        }
    };

    const selectData = [
        {
            name: 'EASY',
            value: 'easy',
        },
        {
            name: 'MEDIUM',
            value: 'medium',
        },
        {
            name: 'HARD',
            value: 'hard',
        },
    ];

    return (
        <GameLayout>
            <div className="pt-16">
                <center>
                    <img src={logoIconPNG} className="w-32" alt="Logo" />
                    <br />
                    <img src={logoNamePNG} className="w-60" alt="Logo" />
                </center>
            </div>
            <h5 className="mt-10 mb-10 text-center font-semibold text-lg">Welcome ! {guestName}</h5>
            <div className="w-full text-center">
                <TextInput onChange={(ev) => setGuestName(ev.target.value)} value={guestName} placeholder="e.g. Deepak" label="Your Name" />
                <div className="my-3 text-red-500 font-semibold">{guestNameError !== '' ? guestNameError : ''}</div>
                <SelectList placeholder="Select Difficulty" label="Difficulty" data={selectData} />
                <div className="my-3 text-red-500 font-semibold">{guestNameError !== '' ? guestNameError : ''}</div>
                <button onClick={startGame} className="bg-red-500 text-white rounded px-5 py-2 mt-10">
                    Start Game
                </button>
            </div>
        </GameLayout>
    );
};

export default GuestLogin;
