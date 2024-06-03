import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import InputBox from '../../components/common/InputBox';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Auth() {
    const navigate = useNavigate();

    const userAuthThroughServer = (serverRoute, formData) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
            .then(({ data }) => {
                console.log(data);
                // Redirect to admin page on successful authentication
                navigate('/admin');
            })
            .catch(({ response }) => {
                toast.error(response.data.msg);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target; // Using the event target to get the form element
        const serverRoute = "/auth";

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
                    {/* link only for texting purpose */}
                    <Link to="/admin">
                    <button
                        className="btn-dark center mt-14"
                        type="submit"
                    >
                        Login
                    </button>
                    </Link>
                </form>
            </section>
        </div>
    );
}

export default Auth;
