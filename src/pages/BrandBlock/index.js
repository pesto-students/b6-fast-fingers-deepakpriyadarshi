import React from 'react';

import { logoIconPNG, logoNamePNG } from '../../utils/images';

const BrandBlock = () => {
    return (
        <div className="pt-10">
            <center>
                <img src={logoIconPNG} className="w-32" alt="Logo" />
                <br />
                <img src={logoNamePNG} className="w-60" alt="Logo" />
            </center>
        </div>
    );
};

export default BrandBlock;
