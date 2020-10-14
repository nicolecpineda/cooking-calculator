import React from 'react';
import convert from 'convert-units';

const conv_arr = [
    [0.0052, "1/4 tsp"],
    [0.0069, "1/3 tsp"],
    [0.0104, "1/2 tsp"],
    [0.0138, "2/3 tsp"],
    [0.0208, "1 tsp"],
    [0.03125, "1/2 tbsp"],
    [0.04167, "2 tsp"],
    [0.0625, "1 tbsp"],
    [0.125, "2 tbsp"],
    [0.1875, "3 tbsp"],
    [0.25, "1/4 cup"],
    [0.333, "1/3 cup"],
    [0.5, "1/2 cup"],
    [0.667, "2/3 cup"],
    [0.75, "3/4 cup"]
]

const Recommended = (props) => { 
    let recval
    let convertedval = convert(props.unitBvalue).from(props.unitB).to('cup');
      
    if(convertedval % 1 > 0.98) {
        if(Math.ceil(convertedval) === 1)
            recval = Math.ceil(convertedval) + " cup";
        else
            recval = Math.ceil(convertedval) + " cups";
    } else {
        let r = convertedval % 1;
        recval = Math.floor(convertedval) + " cup";

        while(r >= 0.005) {
            for(let i=14; i>=0; i--) {
                if(r >= conv_arr[i][0]) {
                    if(i === 14 || i === 13 || i === 12 || i === 11 || i === 10) {
                        if(Math.floor(convertedval) === 0)
                            recval = recval.replace("0 cup", conv_arr[i][1]);
                        else 
                            recval = recval.replace(" cup", " and " + conv_arr[i][1]);
                    } else {
                        recval += (" + " + conv_arr[i][1]);
                        if(Math.floor(convertedval) === 0)
                            recval = recval.replace("0 cup + ", "");
                    }                      
                    r -= conv_arr[i][0];
                    break;
                }
            }
        }
    }
    
    return (
        <div>{recval}</div>
    )
}

export default Recommended;