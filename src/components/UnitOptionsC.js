import React from 'react';

const UnitOptionsC = (props) => { 
    return (
        <select value={props.data.selOption} onChange={props.handleOptions} name={props.data.name} className="selectU">
            {props.units.map(option => <option value={option.abbr} key={option.abbr}>{option.plural}</option>)}
        </select>
    )
}

export default UnitOptionsC;