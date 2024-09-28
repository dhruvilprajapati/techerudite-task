import React, { useState } from 'react'
import Input from '../components/common/Input'
import loginImge from "../assets/login.jpg"
import axios from "axios";

const Login = () => {
    const [payload, setPayload] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = payload;

        if (email === "") {
            setError("Email is required");
            return;
        }
        if (password === "") {
            setError("Password is required");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8080/api/auth/login", payload);
            setSuccess("Login successfully !!!")
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.data?.message || error.message || "An error occurred");
        }
    }

    return (
        <div className='grid grid-cols-2 h-[calc(100vh-64px)] mt-16 overflow-hidden'>
            <div>
                <img src={loginImge} alt="login image" className='h-full w-full object-cover' />
            </div>
            <form onSubmit={onSubmit} className='flex justify-center items-center flex-col p-3 sm:p-5 space-y-4'>
                {success && <p className='text-green-500'>{success}</p>}
                {error && <p className='text-red-500'>{error}</p>}
                <Input
                    onChange={(e) => setPayload((prev) => ({ ...prev, email: e.target.value }))}
                    type='email'
                    label="Email"
                    value={payload.email}
                />
                <Input
                    onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value }))}
                    type='password'
                    label="Password"
                    value={payload.password}
                />
                <button type="submit" className='btn'>Login</button>
            </form>
        </div>
    )
}

export default Login