import React, { useRef, useState, useEffect } from 'react';

// import { convertSecondsToMMSS } from '../../utils/helpers';

function WordTimer({ time, onComplete, className: classNameOverride }) {
    const wordTimerId = useRef();
    const [wordTime, setWordTime] = useState(time);

    const increaseTime = () => {
        setWordTime((prevTime) => {
            if (prevTime - 1 === 0) {
                clearInterval(wordTimerId.current);
                onComplete();
            }
            return prevTime - 1;
        });
    };

    useEffect(() => {
        wordTimerId.current = setInterval(increaseTime, 1000);
        return () => clearInterval(wordTimerId.current);
    }, []);

    return (
        <div>
            <h1 className={`text-center text-8xl py-5 text-red-500 ${classNameOverride}`}>{wordTime}</h1>
        </div>
    );
}

export default WordTimer;