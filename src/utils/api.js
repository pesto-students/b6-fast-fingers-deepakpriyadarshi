import { FASTFINGERS_API_URL } from './constants';

export const authenticatePlayer = async (email, password) => {
    const res = await fetch(FASTFINGERS_API_URL + '/player/authenticate', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
        body: JSON.stringify({ email: email, password: password }),
    });

    return res.json();
};
