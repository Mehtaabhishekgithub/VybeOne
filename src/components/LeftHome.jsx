import React from 'react'
import logo from "../assets/vybe3.png"
import { FaRegHeart } from "react-icons/fa";
import dp2 from "../assets/dp2.webp"
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import axios from 'axios';
import OtherUsers from './OtherUsers';




const LeftHome = () => {

   const {userData , suggestedUsers} = useSelector(state =>state.user)

     const dispatch = useDispatch()
       const handleLogout = async ()=>{
        try {
          const result = await axios.get(`${serverUrl}/api/auth/signout`,{withCredentials:true})
          dispatch(setUserData(null))
        } catch (error) {
          console.log(error)
        }
       }
return (
    
    <div className='w-[25%] hidden lg:block min-h-[100vh] bg-black border-r-2 border-gray-900'>

      <div className='w-full h-[100px] flex items-center justify-between pr-[20px]'>
        {/* image */}
        <img src={logo} alt="Vybe Logo" className="w-[120px]" />
        {/* heart icon  */}
        <div>
        <FaRegHeart className="text-red-500 text-2xl w-[25px] h-[25px]" />
        </div>


      </div>

      {/* profile */}
      <div className='flex items-center justify-between w-full gap-[10px] px-[10px] border-b-2 border-b-gray-900 py-[10px]'>
        <div className='flex items-center gap-[10px]'>
           <div className='w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
      <img src={userData.profileImage || dp2} alt="Profile Picture" 
      className='w-full object-cover'
      />
     </div>
     {/* div for name and username */}
        <div>
          {/* name */}
         <div  className='text-[18px] text-white font-semibold'>{userData.userName}</div>
         {/* username */}
         <div className='text-[15px] text-gray-400 font-semibold'>{userData.name}</div>
        </div>
        </div>
       {/* logout div */}
       <div 
       onClick={handleLogout}
       className='text-blue-500 cursor-pointer'>
        Logout
       </div>
      </div>

<div className='w-full flex flex-col gap-[20px] p-[20px] text-white'>
  <h1 className=" text-[19px]">Suggested Users</h1>
</div>
{suggestedUsers && suggestedUsers.slice(0,3).map((user,idx)=>(
  <OtherUsers key={idx} user={user}/>
))}

</div>
  )
}

export default LeftHome