import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './ProtectedRoute'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App