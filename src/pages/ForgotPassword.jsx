import React from 'react'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import axios from 'axios'
import { serverUrl } from '../App'

const ForgotPassword = () => {
  const [step, setstep] = useState(1)
   const [inputClicked, setInputClicked] = useState({
      email: false,
      otp: false,
      newPassword: false,
      confirmNewPassword: false
    })
    const [email, setemail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState("")
     
    const handleStep1 = async ()=>{
      setloading(true)
      seterror("")
      try {
        const result = await axios.post(`${serverUrl}/api/auth/sendOtp`,
        {email},{withCredentials:true})
        console.log(result.data);
        setstep(2)
        setloading(false)
      } catch (error) {
        console.log("send otp error",error);
        setloading(false)
        seterror(error.response?.data?.message)
      }
    }

    const handleStep2 = async ()=>{
      setloading(true)
      seterror("")
      try {
        const result = await axios.post(`${serverUrl}/api/auth/verifyOtp`,
        {email,otp},{withCredentials:true})
        console.log(result.data);
        setstep(3)
        setloading(false)
      } catch (error) {
        console.log(error);
        setloading(false)
        seterror(error.response?.data?.message)
      }
    }

    const handleStep3 = async ()=>{
     
      try {
        if(newPassword!==confirmNewPassword){
          return seterror("Passwords  not matched")
        }
         seterror("")
      setloading(true)
        const result = await axios.post(`${serverUrl}/api/auth/resetPassword`,
        {email,password:newPassword},{withCredentials:true})
        console.log(result.data);
        setloading(false)
      } catch (error) {
        console.log("send otp error",error);
        setloading(false)
        seterror(error.response?.data?.message)
      }
    }




  return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center
     items-center'>

      {/* step 1 */}
      {step==1 &&
       <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl
      flex justify-center items-center flex-col border-black'>
        <h2 className='text-[30px] font-semibold '>Forgot Password</h2>
        {/* email field */}
               <div onClick={()=>{
              setInputClicked({...inputClicked,email:true})
             }}
              className=" relative flex items-center justify-start  w-[90%] mt-[30px] h-[50px]
             rounded-2xl  border-2 border-black">
              <label className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.email ? 'top-[-15px]' : ''}`} htmlFor="email">Enter Your Email</label>
                <input type="email" id="email" className='w-[100%] h-[100%]
                rounded-2xl px-[20px] outline-none border-0' 
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                required/>
                </div>
                 {error && <p className='text-red-500'>{error}</p>}
                {/* button field */}
                <button
                onClick={handleStep1}
                  disabled={loading}
                  className='w-[70%] px-[20px] py-[10px] bg-black font-semibold h-[50px] cursor-pointer
                     text-white rounded-2xl mt-[30px]'
                  > {loading ? <ClipLoader size={20} color="#ffffff" /> : "Send Otp"}</button>
        </div>
      }

      {/* step 2 */}
      {step==2 &&
      <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl
      flex justify-center items-center flex-col border-black'>
        <h2 className='text-[30px] font-semibold '>Forgot Password</h2>
        {/* otp field */}
               <div onClick={()=>{
              setInputClicked({...inputClicked,otp:true})
             }}
              className=" relative flex items-center justify-start  w-[90%] mt-[30px] h-[50px]
             rounded-2xl  border-2 border-black">
              <label className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.otp ? 'top-[-15px]' : ''}`} htmlFor="otp">Enter Your OTP</label>
                <input type="text" id="otp" className='w-[100%] h-[100%]
                rounded-2xl px-[20px] outline-none border-0' 
                value={otp}
                onChange={(e)=>setOtp(e.target.value)}
                required/>
                </div>
                 {error && <p className='text-red-500'>{error}</p>}
                {/* button field */}
                <button
                onClick={handleStep2}
                  disabled={loading}
                  className='w-[70%] px-[20px] py-[10px] bg-black font-semibold h-[50px] cursor-pointer
                     text-white rounded-2xl mt-[30px]'
                  > {loading ? <ClipLoader size={20} color="#ffffff" /> : "Submit OTP"}</button>
        </div>
        }

        {/* step 3 */}
                
      {step==3 &&
<div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl
flex justify-center items-center flex-col border-black'>

<h2 className='text-[30px] font-semibold'>Reset Password</h2>

{/* new password */}
<div onClick={()=>setInputClicked({...inputClicked,newPassword:true})}
className="relative flex items-center w-[90%] mt-[30px] h-[50px]
rounded-2xl border-2 border-black">

<label className={`absolute left-[20px] bg-white p-[5px]
${inputClicked.newPassword ? 'top-[-15px]' : ''}`}>
Enter New Password
</label>

<input
type="text"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
className="w-full h-full px-[20px] rounded-2xl outline-none"
/>
</div>

{/* confirm password */}
<div onClick={()=>setInputClicked({...inputClicked,confirmNewPassword:true})}
className="relative flex items-center w-[90%] mt-[30px] h-[50px]
rounded-2xl border-2 border-black">

<label className={`absolute left-[20px] bg-white p-[5px]
${inputClicked.confirmNewPassword ? 'top-[-15px]' : ''}`}>
Confirm New Password
</label>

<input
type="text"
value={confirmNewPassword}
onChange={(e)=>setConfirmNewPassword(e.target.value)}
className="w-full h-full px-[20px] rounded-2xl outline-none"
/>
</div>
 {error && <p className='text-red-500'>{error}</p>}
<button
onClick={handleStep3}
disabled={loading}
className="w-[70%] mt-[30px] h-[50px] bg-black text-white rounded-2xl">

{loading ? <ClipLoader size={20} color="#fff" /> : "Reset Password"}

</button>

</div>
}

 </div>
  )
}

export default ForgotPassword