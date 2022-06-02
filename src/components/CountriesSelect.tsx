import React from "react";
import worldCountries from "../utils/world-countries";

interface Props extends React.HTMLProps<HTMLSelectElement>{
    name?: string;
    defaultOption?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void | any;
}

const CountriesSelect = ({ defaultOption,...props }: Props) =>{
    return (
        <div className="form-group" hidden={props.hidden}>
            <label htmlFor={props.name}>Select a countrie</label>
            <select {...props} className="form-control" name={props.name}>
                {worldCountries.map((countrie, index) => (
                        <option key={index} selected={defaultOption === countrie.name} value={countrie.name}>
                            {countrie.name}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default CountriesSelect