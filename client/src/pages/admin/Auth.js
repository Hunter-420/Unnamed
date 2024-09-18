import React, { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import InputBox from '../../components/common/InputBox';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            sessionStorage.setItem('authToken', token);
            navigate('/admin');
        }
    }, [navigate]);

    const userAuthThroughServer = async (serverRoute, formData) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}${serverRoute}`, formData);
            const { data } = response;
            console.log('API Response:', data); // Debugging log

            if (data.token) {
                Cookies.set('authToken', data.token, { expires: 7 }); // Store the token in a cookie for 7 days
                sessionStorage.setItem('authToken', data.token); // Store the token in session storage
                console.log('Token stored in session storage:', sessionStorage.getItem('authToken')); // Debugging log
                navigate('/admin'); // Redirect to admin page on successful authentication
            } else {
                toast.error("Authentication failed. Please try again.");
            }
        } catch (error) {
            console.error('Error:', error); // Debugging log
            toast.error(error.response?.data?.msg || "An error occurred. Please try again.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const serverRoute = "/auth";

        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        console.log('Form Data:', formObject); // Debugging log

        const { email, password } = formObject;

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

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
                        Welcome back,
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
                        Login
                    </button>
                </form>
            </section>
        </div>
    );
}

export default Auth;
