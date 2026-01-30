import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { MdSearch } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";
import dp2 from "../assets/dp2.webp"





function Nav() {
  return (
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center
    fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]'>
      <div> <GoHomeFill className='text-white w-[25px] h-[25px]'/></div>
      <div><MdSearch className='text-white w-[25px] h-[25px]' /></div>
      <div><FaPlusSquare className='text-white w-[25px] h-[25px]' /></div>
      <div><MdOutlineVideoLibrary className='text-white w-[25px] h-[25px]' /></div>
       <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
            <img src={dp2} alt="Profile Picture" 
            className='w-full object-cover'
            />
           </div>
    </div>
  )
}

export default Nav