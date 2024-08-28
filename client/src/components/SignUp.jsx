import React,{useState} from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'
import "./SignUp.css"

const SignUp = () => {
    const [formData,setFormData] = useState({username:"", email:"", password:""})
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/auth/signup",formData);
            localStorage.setItem("token" , res.data.token);
            navigate("/dashboard")
        } catch (error) {
            console.error(error.response?.data?.msg || `An error occured during signup`)
        }
    }
  return (
    <>
    <form className='signup-form' onSubmit={handleSubmit} >
        <input type="text" name='username' placeholder='Username' value={formData.username} onChange={handleChange} />
        <input type="email" name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
        <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
        <button type='submit'>Signup</button>

    </form>
    </>
  )
}

export default SignUp