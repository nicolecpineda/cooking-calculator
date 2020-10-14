import React from 'react';

const UnitOptionsS = (props) => { 
    return (
        <select value={props.data.selOption} onChange={props.handleOptions} className="selectU">
            {props.units.map(option => <option value={option.abbr} key={option.abbr}>{option.plural}</option>)}
        </select>
    )
}

export default UnitOptionsS;