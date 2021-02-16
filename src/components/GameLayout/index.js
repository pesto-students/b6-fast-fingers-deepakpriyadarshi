import React from 'react';

import { menuSVG, logoNamePNG } from '../../utils/images';
import { DEVELOPER_NAME, DEVELOPER_WEBSITE } from '../../utils/constants';

const GameLayout = ({ children }) => {
    return (
        <div className="App">
            <header className="app-header flex justify-between align-middle py-3 px-2 border-b-2">
                <img src={logoNamePNG} className="h-4 sm:h-6 my-auto" alt="Logo" />
                <div>
                    <ul className="hidden md:inline-flex">
                        <li className="mx-2.5 px-5 py-1 border-2 rounded font-medium hover:border-blue-500 hover:shadow-lg hover:bg-white">
                            How To Play
                        </li>
                        <li className="mx-2.5 px-5 py-1 border-2 rounded font-medium hover:border-blue-500 hover:shadow-lg hover:bg-white">
                            Log In
                        </li>
                    </ul>
                    <img src={menuSVG} className="h-9 my-auto md:hidden lg:hidden" alt="Toggle Menu" />
                </div>
            </header>
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
