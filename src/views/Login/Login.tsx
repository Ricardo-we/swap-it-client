import React, { useState, useContext } from "react";
import { AppContext } from "../../App";
import FormControl from "../../components/FormControl";
import CountriesSelect from "../../components/CountriesSelect";
import { LoginSchema, SignUpSchema } from './../../form-validations/Login';
import { toast, ToastContainer } from 'react-toastify';
import { loginRequest, signUpRequest, confirmationCodeRequest } from './../../services/users-requests';
import NavBar from './../../components/NavBar';
import { useNavigate } from 'react-router-dom';
import CurrencySelect from './../../components/CurrencySelect';

interface LoginForm {
    username?: string
    password?: string
    email?: string
    phone_number?: string
    location?: string
}

function Login() {
    const navigate = useNavigate();
    const { setStoredUser } = useContext<any>(AppContext);
    const [signUpOpen, setSignUpOpen] = useState(false);
    const [verificationCodeConfirmation, setVerificationCodeConfirmation] = useState(false);
    const [formData, setFormData] = useState<LoginForm>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: any) => e.preventDefault()

    const submitVerificationCode = async (e: any) => {
        try {
            e.preventDefault();
            await SignUpSchema.validate(formData);
            const response = await confirmationCodeRequest(e.target[0].value, formData);
            setVerificationCodeConfirmation(true);
            setStoredUser(response);
            navigate('/account')
        } catch (error: any) {
            toast.error(error.toString());
        }
    }

    const login = async () => {
        try {
            await LoginSchema.validate(formData);
            const response = await loginRequest(formData);
            setStoredUser(response);
            navigate('/account')
        } catch (error: any) {
            toast.error(error.toString());
        }
    }

    const signUp = async () => {
        try {
            if (formData?.phone_number === '') formData.phone_number = undefined;
            await SignUpSchema.validate(formData);
            const response = await signUpRequest(formData);
            setVerificationCodeConfirmation(true);

        } catch (error: any) {
            toast.error(error.toString());
        }
    }

    return (<>
        <NavBar />
        {verificationCodeConfirmation ?
            <div className="container-sm w-50" style={{ minWidth: 180 }}>
                <form onSubmit={submitVerificationCode} className="form">
                    <h3>Enter your verification code it was sent to your email</h3>
                    <ToastContainer />
                    <FormControl placeholder="Enter verification code" pattern="^[0-9]{4,}$" />
                    <button className="btn btn-outline-primary w-100" type="submit">
                        Confirm
                    </button>
                    <button className="btn btn-outline-info w-100" onClick={() => setVerificationCodeConfirmation(false)}>
                        Change some fields
                    </button>
                </form>
            </div>
            :
            <div className="container-sm w-50" style={{ minWidth: 180 }}>
                <ToastContainer />
                <form className="form" onSubmit={handleSubmit}>
                    <h3>{signUpOpen ? 'Sign up!' : 'Login'}</h3>
                    <FormControl
                        onChange={handleChange}
                        name="username"
                        required
                        alertMessage="Username is at least 3 characters long and should not have white spaces and"
                        pattern="^.\S{3,150}$"
                        placeholder="Username"
                    />
                    <FormControl
                        pattern="^(?=.*[&#\$%\-_])[\S\w&#\$%\-_]{8,150}$"
                        name="password"
                        required
                        alertMessage="Password requires at least 8 characters and contain a special character: -_#$& and not whitespaces"
                        placeholder="Password"
                        type="password"
                        onChange={handleChange}
                    />
                    <FormControl
                        name="email"
                        pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$"
                        alertMessage="Invalid email"
                        hidden={!signUpOpen}
                        required={signUpOpen}
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <FormControl
                        onChange={handleChange}
                        name="phone_number"
                        hidden={!signUpOpen}
                        pattern="^[\d\+\s]{5,20}$"
                        variant="warning"
                        alertMessage="Invalid phone number (optional field)"
                        type="tel"
                        placeholder="Phone number"
                    />
                    <CountriesSelect name="location" onChange={handleChange} hidden={!signUpOpen} />
                    <CurrencySelect name="user_currency" onChange={handleChange} hidden={!signUpOpen} />
                    <button className="btn btn-link text-left" type="button" onClick={() => setSignUpOpen(prev => !prev)}>
                        {signUpOpen ? 'Already registered login!' : 'Not an account yet? sign up!'}
                    </button>
                    {signUpOpen ?
                        <button className="btn btn-outline-primary w-100" onClick={signUp}>
                            Sign up
                        </button>
                        :
                        <button className="btn btn-info w-100" onClick={login}>
                            Login
                        </button>
                    }
                </form>
            </div>
        }
    </>
    );
}

export default Login;