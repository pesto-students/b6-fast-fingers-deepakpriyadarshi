import { FASTFINGERS_API_URL } from './constants';
import { getPlayerAuthToken } from './helpers';

export const authenticatePlayer = async (email, password) => {
    const res = await fetch(FASTFINGERS_API_URL + '/player/authenticate', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
        body: JSON.stringify({ email: email, password: password }),
    });

    return res.json();
};

export const getPlayerDetails = async (email, password) => {
    const res = await fetch(FASTFINGERS_API_URL + '/player/getDetails', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8', Authorization: `Basic ${getPlayerAuthToken()}` },
    });

    return res.json();
};
