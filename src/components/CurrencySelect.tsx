import React from "react";
import { worldCurrencies } from "../utils/world-countries";

interface Props extends React.HTMLProps<HTMLSelectElement>{
    name?: string;
    defaultOption?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void | any;
}

const CurrencySelect = ({ defaultOption, ...props }: Props) =>{
    return (
        <div className="form-group" hidden={props.hidden}>
            <label htmlFor={props.name}>Select a currency</label>
            <select {...props} className="form-control" name={props.name}>
                {worldCurrencies.map((currency, index) => (
                        <option key={index} selected={currency.symbol === defaultOption} value={currency.symbol}>
                            {currency.symbol}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default CurrencySelect;