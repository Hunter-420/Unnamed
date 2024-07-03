import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import InputBox from '../../components/common/InputBox';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const userAuthThroughServer = (serverRoute, formData) => {
        axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}${serverRoute}`, formData)
            .then(({ data }) => {
                console.log(data);
                // Redirect to login page on successful registration
                navigate('/login');
            })
            .catch(({ response }) => {
                toast.error(response.data.msg);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target; // Using the event target to get the form element
        const serverRoute = "/register";

        // form data
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        console.log(formObject);

        const { email, password } = formObject;

        // Regex
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        // form validation
        if (!email || !password) {
            return toast.error("Please enter all fields");
        }

        if (!emailRegex.test(email)) {
            return toast.error("Please enter a valid email");
        }

        if (!passwordRegex.test(password)) {
            return toast.error("Password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter");
        }

        userAuthThroughServer(serverRoute, formObject);
    };

    return (
        <div>
            <section className="h-cover flex items-center justify-center">
                <Toaster />
                <form id="formElement" className="w-[80%] max-w-[400px]" onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-gelasio capitalize text-center ">
                        Register,
                    </h1>
                    <h1 className="text-4xl font-gelasio capitalize text-center mb-16">
                        Aabha Trade
                    </h1>
                    <InputBox
                        name="email"
                        type="email"
                        placeholder="Email"
                        icon="fi-rr-envelope"
                    />
                    <InputBox
                        name="password"
                        type="password"
                        placeholder="Password"
                        icon="fi-rr-key"
                    />
                    <button
                        className="btn-dark center mt-14"
                        type="submit"
                    >
                        Register
                    </button>
                    <Link to="/login" className="mt-4 text-center">
                        Already have an account? Login here
                    </Link>
                </form>
            </section>
        </div>
    );
}

export default Register;
