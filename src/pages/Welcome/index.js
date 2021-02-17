import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import GameLayout from '../../components/GameLayout';
import BrandBlock from '../BrandBlock';

import { prepareDictionary } from '../../utils/helpers';

const Welcome = () => {
    useEffect(() => {
        prepareDictionary();
    }, []);

    return (
        <GameLayout>
            <BrandBlock />
            <h5 className="mt-10 mb-10 text-center font-semibold text-lg">Play As ?</h5>
            <div className="w-full inline-flex justify-center">
                <Link to="/guest" className="mx-2 py-2 px-5 border-2 border-blue-500 rounded font-bold hover:bg-white hover:shadow-lg">
                    Guest
                </Link>
                {/* <Link
                    to="/register"
                    className="mx-2 py-2 px-5 border-2 border-blue-500 rounded font-bold hover:bg-white hover:shadow-lg"
                    disabled>
                    Register
                </Link> */}
            </div>
        </GameLayout>
    );
};

export default Welcome;
