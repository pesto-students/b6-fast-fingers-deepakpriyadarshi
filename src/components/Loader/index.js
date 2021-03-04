import React from 'react';
import { loaderGIF } from '../../utils/images';

function Loader(props) {
    return (
        <div className="">
            <img src={loaderGIF} {...props} alt="Loader" className={`mx-auto ${props?.className ? props.className : ''}`} />
            <h6>{props?.loadingmessage ? props.loadingmessage : ''}</h6>
        </div>
    );
}

export default Loader;
