import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import Form from "../../../components/Form";
import CountriesSelect from "../../../components/CountriesSelect";
import CurrencySelect from './../../../components/CurrencySelect';
import FormControl from "../../../components/FormControl";
import { updateUserRequest } from "../../../services/users-requests";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

export default function UserSettingsForm(){
    const [formData, setFormData] = useState({});
    const { storedUser, setStoredUser } = useContext<any>(AppContext);

    const formFields = [
        {
            name:"username" ,
            pattern:"^.{3,150}$",
            variant:"error",
            alertMessage: "Username is at least 3 characters long",
            placeholder: "Username",
            defaultValue:storedUser.user.username
        },
        // {
        //     name:"password" ,
        //     pattern:"^(?=.*[&#\$%\-_])[\s\w&#\$%\-_]{8,150}$",
        //     variant:"error",
        //     alertMessage: "Password requires at least 8 characters and contain a special character: -_#$&",
        //     placeholder: "Password",
        //     type: "password",
        // },
        {
            name:"phone_number" ,
            pattern:"^[\\d\\+\\s]{5,20}$",
            variant:"warning",
            alertMessage: "Invalid phone number (optional field)",
            type:"tel" ,
            placeholder: "Phone number",
            defaultValue: storedUser.user.phone_number,
        }
    ]

    const handleChange = (e: any) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: any) => {
        return updateUserRequest(storedUser, formData)
            .then(res => {
                toast.success('User data updated')
                setStoredUser((prev:any) => ({...prev, user: res}));
            })
            .catch(error => toast.error(error.toString()));
    }

    return (
        <>
            <ToastContainer/>
            <FormControl placeholder="Email" value={storedUser.user.email} disabled/>
            <Form onSubmit={handleSubmit} buttonText="Save changes" fields={formFields} onChangeFields={(data) => setFormData(prev => ({...prev, ...data}))}>
                <CountriesSelect defaultOption={storedUser.user.location} name="location" onChange={handleChange} />
                <CurrencySelect defaultOption={storedUser.user.user_currency} name="user_currency" onChange={handleChange} />
            </Form>
        </>
    )
}