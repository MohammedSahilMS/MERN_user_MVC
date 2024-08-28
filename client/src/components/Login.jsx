import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await axiosInstance.post("/auth/login", formData);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error(error.response?.data?.msg || "An error occurred while logging in");
        }
    };

    return (
        <>
            <form className='login-form' onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder='Email'  
                    value={formData.email} 
                    onChange={handleChange} 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder='Password'  
                    value={formData.password} 
                    onChange={handleChange} 
                />
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;
