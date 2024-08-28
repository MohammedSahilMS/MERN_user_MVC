import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Dashboard.css"


const Dashboard = () => {
    const navigate = useNavigate()


    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
  return (
    <>
    <div className='dashboard-container' >
        <h1>Welcome to the Dashboard...!!</h1>
        <button onClick={handleLogout}>Logout</button>
    </div>
    </>
  )
}

export default Dashboard