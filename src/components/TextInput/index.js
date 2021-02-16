import React from 'react';

const TextInput = (props) => {
    return (
        <div className="w-full my-3">
            <label>{props?.label || 'Input Text'}</label>
            <br />
            <input className={`border-2 p-2 rounded-xl ${props?.width || 'w-52'}`} {...props}></input>
        </div>
    );
};

export default TextInput;
