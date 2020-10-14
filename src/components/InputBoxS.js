import React from 'react';

const InputBoxS = (props) => {
    return (
        <input 
            type= 'number'
            value={props.data.currentVal} 
            onChange={props.handleInput}
            placeholder="Type here"
            className="inputS"
        />
    )
}

export default InputBoxS;