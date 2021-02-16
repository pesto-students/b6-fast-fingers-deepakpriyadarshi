import React from 'react';

const SelectList = ({ label, width, data, ...rest }) => {
    return (
        <div className="w-full my-3">
            <label>{label || 'Select List'}</label>
            <br />
            <select className={`border-2 p-2 rounded-xl ${width || 'w-52'}`} {...rest}>
                {data ? (
                    data.map((option, index) => {
                        return (
                            <option key={`sl-${index}`} value={option.value}>
                                {option.name}
                            </option>
                        );
                    })
                ) : (
                    <option value="">No Data</option>
                )}
            </select>
        </div>
    );
};

export default SelectList;
