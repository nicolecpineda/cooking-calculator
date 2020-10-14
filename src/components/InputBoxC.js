import React from 'react';

const InputBoxC = (props) => {
    return (
        <input 
            type= 'number'
            value={props.data.currentVal} 
            onChange={props.handleInput}
            placeholder="Type here"
            className="inputC"
        />
    )
}

export default InputBoxC;