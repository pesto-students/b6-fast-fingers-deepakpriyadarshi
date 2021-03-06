import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import GameLayout from '../../components/GameLayout';
import Loader from '../../components/Loader';
import TextInput from '../../components/TextInput';
import BrandBlock from '../../components/BrandBlock';

import { savePlayerAuth } from '../../utils/localstorage';

// Custom Login Hook
import useAuthForm from '../../hooks/useAuthForm';
import { registerPlayer } from '../../utils/api';
import { isUserLogged } from '../../utils/helpers';

const PlayerRegister = () => {
    const [authFormState, setAuthForm] = useAuthForm();

    const handlePlayerInfo = () => {
        if (authFormState.playerName.length === 0) {
            setAuthForm('name-error', true);
        } else if (authFormState.playerEmail.length === 0) {
            setAuthForm('email-error', true);
        } else if (authFormState.playerPassword.length === 0) {
            setAuthForm('password-error', true);
        } else {
            setAuthForm('email-error', false);
            setAuthForm('password-error', false);
            setAuthForm('authloader', true);
            setAuthForm('authloader-msg', 'Please wait while we register you');
            registerPlayer(authFormState.playerName, authFormState.playerEmail, authFormState.playerPassword)
                .then((auth_response) => {
                    const authFormMsg = document.getElementById('auth-form-message');
                    if (auth_response.status === 'exists') {
                        setAuthForm('authloader', false);
                        authFormMsg.innerHTML = `Looks like you are already registered`;
                    } else if (auth_response.status === 'error') {
                        setAuthForm('authloader', false);
                        authFormMsg.innerHTML = `Some Error Happened, Please Try Again`;
                    } else if (auth_response.status === 'success') {
                        authFormMsg.innerHTML = '';
                        setAuthForm('authloader-msg', 'Registered Successfully! Please wait while we redirect to your dashboard.');
                        savePlayerAuth(auth_response.token);
                        setAuthForm('authstatus', true);
                    }
                })
                .catch((err) => {
                    console.log('Auth Error', err);
                });
        }
    };

    if (isUserLogged()) return <Redirect to="/dashboard" />;
    if (authFormState.authStatus) return <Redirect to="/dashboard" />;

    return (
        <GameLayout>
            <BrandBlock />
            <div className="mt-5 mb-10 text-center">
                Already have an account ? <br />
                <Link to="/login" className="text-blue-500">
                    click here
                </Link>{' '}
                to login
            </div>
            <div className="w-full text-center">
                <TextInput
                    type="text"
                    onChange={(ev) => setAuthForm('name', ev.target.value)}
                    value={authFormState.playerName}
                    placeholder="e.g. Deepak Priyadarshi"
                    label="Your Name"
                    className="w-72"
                    disabled={authFormState.authLoader}
                />
                <div className="my-3 text-red-500 font-semibold">{authFormState.playerNameError ? 'Please Enter Name' : ''}</div>
                <TextInput
                    type="email"
                    onChange={(ev) => setAuthForm('email', ev.target.value)}
                    value={authFormState.playerEmail}
                    placeholder="e.g. deepak@fastfingers.com"
                    label="Your Email"
                    className="w-72"
                    disabled={authFormState.authLoader}
                />
                <div className="my-3 text-red-500 font-semibold">{authFormState.playerEmailError ? 'Please Enter Email' : ''}</div>
                <TextInput
                    type="password"
                    onChange={(ev) => setAuthForm('password', ev.target.value)}
                    value={authFormState.playerPassword}
                    label="Your Password"
                    className="w-72"
                    placeholder="Enter Your Password"
                    disabled={authFormState.authLoader}
                />
                <div className="my-3 text-red-500 font-semibold">
                    {authFormState.playerPasswordError ? 'Please Enter Your Password' : ''}
                </div>
                <div id="auth-form-message" className="text-red-500"></div>
                {!authFormState.authLoader && (
                    <button onClick={(ev) => handlePlayerInfo(ev)} className="bg-green-500 text-white rounded px-5 py-2 mt-10">
                        Register
                    </button>
                )}
                {authFormState.authLoader && <Loader className="w-20" loadingmessage={authFormState.authLoaderMessage} />}

                <div className="mt-10">
                    Don't have an account ? <br />
                    <Link to="/register" className="text-blue-500">
                        click here
                    </Link>{' '}
                    to register
                </div>
            </div>
        </GameLayout>
    );
};

export default PlayerRegister;
