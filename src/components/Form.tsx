import { useEffect } from 'react';
import { useState } from 'react';
import FormControl, { FormControlTextArea } from './FormControl';

interface FormControlProps extends React.HTMLProps<HTMLInputElement | HTMLTextAreaElement | any> {
    alertMessage?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | any
    variant?: string
}

interface FormProps {
    fields?: Array<FormControlProps>;
    defaults?: object;
    formTitle?: string | JSX.Element;
    buttonText?: string;
    onSubmit?: (data: any) => void | any;
    onError?:(data: string) => void | any;
    onChangeFields?: (data: any) => void | any;
    children?: JSX.Element | string | JSX.Element[] | string[]
    resetOnSubmit?: boolean
}

// [{alertMessage, onChange, variant}]

function Form({ fields, onSubmit, onChangeFields, onError, defaults, formTitle, buttonText, children, resetOnSubmit=false }: FormProps) {
    const [formData, setFormData] = useState({});

    
    const handleChange = (e: any) => {
        setFormData(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }));
        onChangeFields && onChangeFields({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: any) => {
        try{    
            e.preventDefault();
            onSubmit && onSubmit(formData);
            if(resetOnSubmit) e.target.reset()
        } catch(error: any){
            onError ? onError(error.toString()) : console.log(error.toString());
        }
    }

    useEffect(() => {
        if(defaults) setFormData(prev => ({...prev, ...defaults}))
        else fields?.forEach((field) => setFormData(prev => ({...prev, [field.name || '']: field.defaultValue})))
    }, [defaults]) 

    return ( 
        <>
            <form onSubmit={handleSubmit} className="form p-3 w-100">
                {formTitle}
                {fields?.map((field, index) => (
                    <div key={index}>
                    {field.type ==='textarea' ?
                        <FormControlTextArea
                            {...field}
                            name={field.name}
                            defaultValue={field.defaultValue}
                            onChange={handleChange}
                        />
                        : <FormControl
                            {...field}
                            type={field.type || 'text'}
                            name={field.name}
                            defaultValue={field.defaultValue}
                            onChange={handleChange}
                        />
                    }
                    </div>
                ))}
                {children}
                <button type="submit" className="btn btn-outline-primary w-100">
                    {buttonText}
                </button>
            </form>
        </> 
    );
}

export default Form;