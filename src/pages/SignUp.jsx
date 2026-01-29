import React, { useState } from 'react'
import vybelogo from "../assets/vybe2.png"
import vybenew from "../assets/vybe21.png"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios"
import { serverUrl } from '../App';
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';






const SignUp = () => {

  const [inputClicked, setInputClicked] = useState({
    name: false,
    userName: false,
    email: false,
    password: false
  })

const [showPassword, setshowPassword] = useState(false)
const [loading, setloading] = useState(false)
const [error, seterror] = useState("")

const [name, setname] = useState("")
const [userName, setuserName] = useState("")
const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const navigate = useNavigate();

const handleSignup=async ()=>{
  try {
    setloading(true)
    seterror("")
    const result = await axios.post(`${serverUrl}/api/auth/signup`,
      {name,userName,email,password},{withCredentials:true})
      console.log(result.data);
      setloading(false)
    } 
    catch (error) {
    console.log("signup error",error);
    setloading(false)
    seterror(error.response?.data?.message)
  }

}

return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center
     items-center'>
      <div className='w-[90%] lg:max-w-[60%] h-[600px]  bg-[#fbfbfc] rounded-2xl flex justify-center items-center
      overflow-hidden border-2 border-[#1a1f23]'>
       
       {/* form wala div */}
          <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px]'>

          {/* image and title */}
           <div className='flex items-center text-[20px] font-semibold '>
            <img src={vybelogo} alt="" className='w-[150px]'/>
           </div>
          
          {/* input fields */}
             
             {/* name field */}
             <div onClick={()=>{
              setInputClicked({...inputClicked,name:true})
             }}
             className=" relative flex items-center justify-start  w-[90%] h-[50px]
             rounded-2xl  border-2 border-black">
              <label className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.name ? 'top-[-15px]' : ''}`} htmlFor="name">Enter Your Name</label>
                <input 
                type="text" id="name" className='w-[100%] h-[100%]
                rounded-2xl px-[20px] outline-none border-0'
                 value={name}
                  onChange={(e)=>setname(e.target.value)}/>
             </div>

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

              {/* email field */}
               <div onClick={()=>{
              setInputClicked({...inputClicked,email:true})
             }}
              className=" relative flex items-center justify-start  w-[90%] h-[50px]
             rounded-2xl  border-2 border-black">
              <label className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.email ? 'top-[-15px]' : ''}`} htmlFor="email">Enter Your Email</label>
                <input type="email" id="email" className='w-[100%] h-[100%]
                rounded-2xl px-[20px] outline-none border-0' 
                value={email}
                onChange={(e)=>setemail(e.target.value)}
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
            {error && <p className='text-red-500'>{error}</p>}

          {/* submit button */}
          <button
          onClick={handleSignup}
          disabled={loading}
          className='w-[70%] px-[20px] py-[10px] bg-black font-semibold h-[50px] cursor-pointer
           text-white rounded-2xl mt-[30px]'
           > {loading ? <ClipLoader size={20} color="#ffffff" /> : "SignUp"}</button>
             <p className='cursor-pointer text-gray-800'>Already have an Account? <span
             onClick={()=>navigate('/signin')}
             className=' pb-[3px]  text-blue-500'>SignIn</span></p>
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

export default SignUp