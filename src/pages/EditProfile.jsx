import React, { useRef } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dp2 from "../assets/dp2.webp";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setProfileData, setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";
const EditProfile = () => {
  const { userData } = useSelector((state) => state.user);
  const imageInput = useRef();
  const navigate = useNavigate();
  const [frontendImage, setFrontendImage] = useState(
    userData.profileImage || dp2,
  );
  const [backendImage, setBackendImage] = useState(null);
  const [name, setName] = useState(userData.name || "");
  const [userName, setUserName] = useState(userData.userName || "");
  const [bio, setBio] = useState(userData.bio || "");
  const [profession, setProfession] = useState(userData.profession || "");
  const [gender, setGender] = useState(userData.gender || "");
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)
  const handleImage = async (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  const handleEditProfile = async () => {
    setLoading(true)
    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("userName", userName);
      formdata.append("bio", bio);
      formdata.append("profession", profession);
      formdata.append("gender", gender);
      if (backendImage) {
        formdata.append("profileImage", backendImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/user/editProfile`,
        formdata,
        { withCredentials: true })
        dispatch(setProfileData(result.data))
         dispatch(setUserData(result.data))
         setLoading(false)
         navigate(`/profile/${userData.userName}`)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  };
  return (
    <div
      className="w-full min-h-[100vh]
    bg-black flex items-center flex-col gap-[20px]"
    >
      <div
        className="w-full h-[80px]  
      flex gap-[20px] items-center px-[20px]
       text-white "
      >
        <IoArrowBackSharp
          onClick={() => navigate(`/profile/${userData.userName}`)}
          className="w-[25px] h-[25px] cursor-pointer text-white"
        />
        <h1 className="text-white text-[20px] font-semibold">Edit Profile</h1>
      </div>
      <div
        onClick={() => imageInput.current.click()}
        className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] border-2 
       border-black rounded-full cursor-pointer overflow-hidden"
      >
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          hidden
          onChange={handleImage}
        />
        <img
          src={frontendImage}
          alt="Profile Picture"
          className="w-full object-cover"
        />
      </div>

      <div
        onClick={() => imageInput.current.click()}
        className="text-blue-500 font-semibold cursor-pointer"
      >
        Change Your Profile Picture
      </div>

      <input
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
      px-[20px] outline-none border-2 border-gray-700 rounded-2xl
       text-white font-semibold"
        type="text"
        placeholder="Enter Your Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
      px-[20px] outline-none border-2 border-gray-700 rounded-2xl
       text-white font-semibold"
        type="text"
        placeholder="Enter Your UserName"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />
      <input
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
      px-[20px] outline-none border-2 border-gray-700 rounded-2xl
       text-white font-semibold"
        type="text"
        placeholder="Enter Your Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
      />
      <input
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
      px-[20px] outline-none border-2 border-gray-700 rounded-2xl
       text-white font-semibold"
        type="text"
        placeholder="Enter Your Profession"
        onChange={(e) => setProfession(e.target.value)}
        value={profession}
      />
      <input
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
      px-[20px] outline-none border-2 border-gray-700 rounded-2xl
       text-white font-semibold"
        type="text"
        placeholder="Enter Your Gender"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
      />
      <button
        className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px]
            bg-[white] cursor-pointer rounded-2xl font-semibold "
             onClick={handleEditProfile}>{loading ? <ClipLoader size={30} color="black"/> : "Save Profile"} </button>
    </div>
  );
};

export default EditProfile;
