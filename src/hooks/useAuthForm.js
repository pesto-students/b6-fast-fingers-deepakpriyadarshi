import { useState } from 'react';

function useAuthForm() {
    let initialAuthState = {
        playerName: '',
        playerNameError: false,
        playerEmail: '',
        playerEmailError: false,
        playerPassword: '',
        playerPasswordError: false,
        authLoader: false,
        authLoaderMessage: '',
        authStatus: false,
    };

    const [authState, setAuthState] = useState(initialAuthState);

    const setAuthForm = (action, authData = null) => {
        switch (action) {
            case 'name': {
                setAuthState((prevState) => ({ ...prevState, playerName: authData, playerNameError: false }));
                break;
            }
            case 'name-error': {
                setAuthState((prevState) => ({ ...prevState, playerNameError: authData }));
                break;
            }
            case 'email': {
                setAuthState((prevState) => ({ ...prevState, playerEmail: authData, playerEmailError: false }));
                break;
            }
            case 'email-error': {
                setAuthState((prevState) => ({ ...prevState, playerEmailError: authData }));
                break;
            }
            case 'password': {
                setAuthState((prevState) => ({ ...prevState, playerPassword: authData, playerPasswordError: false }));
                break;
            }
            case 'password-error': {
                setAuthState((prevState) => ({ ...prevState, playerPasswordError: authData }));
                break;
            }
            case 'authloader': {
                setAuthState((prevState) => ({ ...prevState, authLoader: authData }));
                break;
            }
            case 'authloader-msg': {
                setAuthState((prevState) => ({ ...prevState, authLoaderMessage: authData }));
                break;
            }
            case 'authstatus': {
                setAuthState((prevState) => ({ ...prevState, authStatus: authData }));
                break;
            }
            default:
                return authState;
        }
    };

    return [authState, setAuthForm];
}

export default useAuthForm;
