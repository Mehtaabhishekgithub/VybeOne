import React, { useState } from 'react'
import vybelogo from "../assets/vybe2.png"
import vybenew from "../assets/vybe21.png"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios"
import { serverUrl } from '../App';
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';






const SignIn = () => {

  const [inputClicked, setInputClicked] = useState({
    userName: false,
    password: false
  })

const [showPassword, setshowPassword] = useState(false)
const [loading, setloading] = useState(false)


const [userName, setuserName] = useState("")
const [password, setpassword] = useState("")
const navigate = useNavigate();

const handleSignIn=async ()=>{
  try {
    setloading(true)
    const result = await axios.post(`${serverUrl}/api/auth/signin`,
      {userName,password},{withCredentials:true})
      console.log(result.data);
      setloading(false)
    } 
    catch (error) {
    console.log("signin error",error);
    setloading(false)
  }

}

return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center
     items-center'>
      <div className='w-[90%] lg:max-w-[60%] h-[600px]  bg-[#fbfbfc] rounded-2xl flex justify-center items-center
      overflow-hidden border-2 border-[#1a1f23]'>
       
       {/* form wala div */}
          <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center
          justify-center p-[10px] gap-[20px]'>

          {/* image and title */}
           <div className='flex items-center text-[20px] font-semibold '>
            <img src={vybelogo} alt="" className='w-[150px]'/>
           </div>
          
          {/* input fields */}
             

              {/* username field */}
              <div onClick={()=>{
              setInputClicked({...inputClicked,userName:true})
             }}
              className=" relative flex items-center justify-start  w-[90%] h-[50px]
             rounded-2xl border-2 border-black">
              <label className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.userName ? 'top-[-15px]' : ''}`} htmlFor="userName">Enter Your Username</label>
                <input type="text" id="userName" className='w-[100%] h-[100%]
                rounded-2xl px-[20px] outline-none border-0'
                 value={userName}
                  onChange={(e)=>setuserName(e.target.value)}
                required/>
             </div>

              {/* password field */}
              <div onClick={()=>{
              setInputClicked({...inputClicked,password:true})
             }}
             className=" relative flex items-center justify-start  w-[90%] h-[50px]
             rounded-2xl  border-2 border-black">
              <label className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.password ? 'top-[-15px]' : ''}`} htmlFor="password">Enter Password </label>
                <input type= {showPassword ? "text" : "password"} id="password" className='w-[100%] h-[100%]
                rounded-2xl px-[20px] outline-none border-0' required
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                />
                {!showPassword?<FaRegEye
                onClick={()=>{
                  setshowPassword(true)
                }}
                 className='absolute right-[20px] cursor-pointer w-[25px] h-[25px]' />: <FaRegEyeSlash
                 onClick={()=>{
                  setshowPassword(false)
                }}
                 className='absolute right-[20px] cursor-pointer w-[25px] h-[25px]'/>}
               
             </div>

          {/* submit button */}
          <button
          onClick={handleSignIn}
          disabled={loading}
          className='w-[70%] px-[20px] py-[10px] bg-black font-semibold h-[50px] cursor-pointer
           text-white rounded-2xl mt-[30px]'
           > {loading ? <ClipLoader size={20} color="#ffffff" /> : "Sign In"}</button>
             <p className='cursor-pointer text-gray-800'>Want to Create a New Account?  <span
             onClick={()=>navigate('/signup')}
             className=' pb-[3px]  text-blue-500'>SignUp</span></p>
          </div>
        



        {/* logo wala div */}
        <div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] 
        flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black'>
         
         <img src={vybenew} alt="" className='w-full'/>
        </div>


      </div>
      </div>
  )
}

export default SignIn