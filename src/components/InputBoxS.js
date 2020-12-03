import React from 'react';

//Input box for Scale
const InputBoxS = (props) => {
    return (
        <input 
            type= 'number'
            value={props.data.currentVal} 
            onChange={props.handleInput}
            placeholder="Quantity"
            className="inputS"
        />
    )
}

export default InputBoxS;