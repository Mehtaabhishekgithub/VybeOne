import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'

import { useDispatch, useSelector } from 'react-redux';
import { setSuggestedUsers, setUserData } from '../redux/userSlice';
import axios from 'axios';


const getSuggestedtUsers = () => {
  const dispatch = useDispatch();
  const {userData}=useSelector(state=>state.user)
 useEffect(()=>{
  const fetchUser = async ()=>{
try { 
  const result = await axios.get(`${serverUrl}/api/user/suggested`,{withCredentials:true})

  dispatch(setSuggestedUsers(result.data))

} catch (error) {
  console.log("get suggested user error",error);
}
 }
  fetchUser();
},[userData])
}
export default getSuggestedtUsers