import React from 'react';

//Input box for Convert
const InputBoxC = (props) => {
    return (
        <input 
            type= 'number'
            value={props.data.currentVal} 
            onChange={props.handleInput}
            placeholder="Quantity"
            className="inputC"
        />
    )
}

export default InputBoxC;