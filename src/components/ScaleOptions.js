import React from 'react';

const factors = [
    [(1/6), "1/6x"],
    [0.2, "1/5x"],
    [0.25, "1/4x"],
    [(1/3), "1/3x"],
    [0.5, "1/2x"],
    [(2/3), "2/3x"],
    [0.75, "3/4x"],
    [1, "1x"],
    [1.5, "1.5x"],
    [2, "2x"],
    [3, "3x"],
    [4, "4x"],
    [5, "5x"],
    [6, "6x"],
]

//Dropdown menu for scaling factors in Scale
const ScaleOptions = (props) => { 
    return (
        <select value={props.data.selOption} onChange={props.handleScales} className="selectF">
            {factors.map(option => <option value={option[0]} key={option[0]}>{option[1]}</option>)}
        </select>
    )
}

export default ScaleOptions;