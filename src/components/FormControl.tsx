import React, { useState, useEffect } from "react";
import { Alert } from 'react-bootstrap'

interface FormControlProps extends React.HTMLProps<HTMLInputElement> {
    alertMessage?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | any
    variant?: string
}

const FormControl = ({alertMessage, onChange=(e)=>{}, ...props}: FormControlProps) => {
    const [matchPattern, setMatchPattern] = useState(true);
    const pattern = RegExp(props.pattern || '.');
    
    return (    
        <div hidden={props.hidden} className="form-group">
            <label htmlFor={props.name}>{props.placeholder}</label>
            <input 
                {...props} 
                onChange={e => {
                    onChange(e)
                    if(pattern.test(e.target.value)) setMatchPattern(true)
                    else if(e.target.value === ''  && !props.required) setMatchPattern(true)
                    else setMatchPattern(false);
                }} 
                className="form-control"
            />
            {alertMessage && pattern && !matchPattern &&
                <Alert variant={props.variant || "danger"}>
                    {alertMessage}
                </Alert>
            }
        </div>
    );
}

interface FormControlTextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
    alertMessage?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void | any
    variant?: string
}

export function FormControlTextArea({alertMessage, onChange=(e)=>{}, ...props}: FormControlTextAreaProps){
    const [matchPattern, setMatchPattern] = useState(true);
    const pattern = RegExp(props.pattern || '.');
    
    return (    
        <div hidden={props.hidden} className="form-group">
            <label htmlFor={props.name}>{props.placeholder}</label>
            <textarea 
                {...props} 
                onChange={e => {
                    onChange(e)
                    if(pattern.test(e.target.value)) setMatchPattern(true)
                    else if(e.target.value === '' && !props.required) setMatchPattern(true)
                    else setMatchPattern(false);
                }} 
                className="form-control"
            ></textarea>
            {alertMessage && pattern && !matchPattern &&
                <Alert variant={props.variant || "danger"}>
                    {alertMessage}
                </Alert>
            }
        </div>
    );
}

export default FormControl;