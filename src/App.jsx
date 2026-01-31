import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import getCurrentUser from './hooks/getCurrentUser'
import getSuggestedtUsers from './hooks/getSuggestedUsers'
import Profile from './pages/profile'
import EditProfile from './pages/EditProfile'
export const serverUrl = "http://localhost:5000"

const App = () => {
getCurrentUser()
getSuggestedtUsers()
  const {userData} = useSelector((state)=>state.user);
  return (
   <Routes>
    <Route path="/signin" element={!userData ?<SignIn />:<Navigate to="/" />} />
    <Route path="/signup" element={!userData ?  <SignUp />:<Navigate to="/" /> } />
    <Route path="/" element={userData ? <Home /> : <Navigate to="/signin" /> } />
    <Route path="/forgotpassword" element={!userData ?  <ForgotPassword />:<Navigate to="/" /> } />
    <Route path="/profile/:userName" element={userData ? <Profile/> : <Navigate to="/signin" /> } />
    <Route path="/editprofile" element={userData ? <EditProfile/> : <Navigate to="/signin" /> } />
    </Routes>
    
  )
}

export default App