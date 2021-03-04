import React, { useState } from 'react';

import { menuSVG, logoNamePNG } from '../../utils/images';
import { DEVELOPER_NAME, DEVELOPER_WEBSITE } from '../../utils/constants';
import { Link } from 'react-router-dom';

const GameLayout = ({ children }) => {
    const [mobNavActive, setMobNavActive] = useState(false);

    return (
        <div className="App">
            <header className="app-header flex justify-between align-middle py-3 px-2 border-b-2">
                <Link to="/" className="my-auto">
                    <img src={logoNamePNG} className="h-4 sm:h-6" alt="Logo" />
                </Link>

                <div>
                    <ul className="hidden md:inline-flex">
                        <li className="mx-2.5 px-5 py-1 border-2 rounded font-medium hover:border-blue-500 hover:shadow-lg hover:bg-white">
                            How To Play
                        </li>
                        <li className="mx-2.5 px-5 py-1 border-2 rounded font-medium hover:border-blue-500 hover:shadow-lg hover:bg-white">
                            <Link to="/login">Log In</Link>
                        </li>
                    </ul>
                    <img
                        src={menuSVG}
                        className="h-9 my-auto md:hidden lg:hidden"
                        alt="Toggle Menu"
                        onClick={() => setMobNavActive(true)}
                    />
                </div>
            </header>
            {mobNavActive && (
                <div className="fixed z-50 bg-gray-800 w-screen h-screen">
                    <div className="text-right p-3">
                        <button
                            onClick={() => setMobNavActive(false)}
                            className="w-30 px-5 pt-2 pb-2 rounded-full hover:shadow-lg font-medium bg-red-500 text-white uppercase">
                            X close
                        </button>
                    </div>
                </div>
            )}
            <main className="app-main">{children}</main>
            <footer className="app-footer text-center py-3">
                Designed &amp; Developed By{' '}
                <a href={DEVELOPER_WEBSITE} rel="noreferrer" target="_blank">
                    {DEVELOPER_NAME}
                </a>
            </footer>
        </div>
    );
};

export default GameLayout;
