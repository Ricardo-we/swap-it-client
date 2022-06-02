import { useState, useEffect } from "react";
import FormControl from "../../../components/FormControl";
import UserContactInfoSchema from "../../../form-validations/UserContactInfoForm";
import { Button } from "react-bootstrap";
import Form from "../../../components/Form";

interface FormInputs {
    id?: number; 
    contact_type?: string;
    contact?: string;
}

interface FormProps {
    defaults?: FormInputs;
    onSubmit: (contactInfo: object | any) => void | any;
    onError?: (error: any) => void | any;
    formTitle?: string | JSX.Element;
    buttonText?: string;
}

function UserContactInfoForm({ defaults, formTitle="User contact info", buttonText="Submit", onError, onSubmit }: FormProps) {
    const formFields = [
        {
            name: "contact_type",
            alertMessage: "Contact is required",
            placeholder:"Contact type, (Whatsapp, Instagram, etc.)",
            required: true,
            defaultValue: defaults?.contact_type
        }
        ,{
            name: "contact",
            alertMessage: "Contact is required",
            placeholder:"Contact, (phone number, instagram acount, etc.)",
            required: true,
            defaultValue: defaults?.contact
        }
    ]

    const handleSubmit = async (data: any) => {
        await UserContactInfoSchema.validate(data);
        onSubmit(data)
    }

    return <Form 
        formTitle={formTitle} 
        buttonText={buttonText} 
        onError={onError} 
        onSubmit={handleSubmit} 
        fields={formFields}
    />;
}

export default UserContactInfoForm;
