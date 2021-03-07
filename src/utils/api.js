import { FASTFINGERS_API_URL } from './constants';
import { getPlayerAuthToken } from './helpers';

export const registerPlayer = async (name, email, password) => {
    const res = await fetch(FASTFINGERS_API_URL + '/player/register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
        body: JSON.stringify({ name: name, email: email, password: password }),
    });

    return res.json();
};

export const authenticatePlayer = async (email, password) => {
    const res = await fetch(FASTFINGERS_API_URL + '/player/authenticate', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
        body: JSON.stringify({ email: email, password: password }),
    });

    return res.json();
};

export const getPlayerDetails = async () => {
    const res = await fetch(FASTFINGERS_API_URL + '/player/getDetails', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8', Authorization: `Bearer ${getPlayerAuthToken()}` },
    });

    return res.json();
};

export const getPlayerScoreStats = async () => {
    const res = await fetch(FASTFINGERS_API_URL + '/score/getPlayerStats', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8', Authorization: `Bearer ${getPlayerAuthToken()}` },
    });

    return res.json();
};

export const savePlayerScore = async (playerScore) => {
    const res = await fetch(FASTFINGERS_API_URL + '/score/savePlayerGameScore', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8', Authorization: `Bearer ${getPlayerAuthToken()}` },
        body: JSON.stringify({ score: playerScore }),
    });

    return res.json();
};

export const getPlayerScores = async ({ queryKey }) => {
    const res = await fetch(FASTFINGERS_API_URL + '/score/getPlayerScores', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8', Authorization: `Bearer ${getPlayerAuthToken()}` },
        body: JSON.stringify({ page: queryKey[1] }),
    });

    return res.json();
};
