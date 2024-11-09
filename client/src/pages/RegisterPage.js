import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom"
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [data,setData] = useState({
    name : "",
    email : "",
    password : "",
    profile_pic : ""

  })
const [uploadPhoto,setUploadPhoto] =  useState("")
const navigate = useNavigate()

const handleOnchange = (e)=>{
const {name,value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value 

      }

    })
  }


const handleUploadPhoto = async(e)=>{
const file = e.target.files[0]

const uploadPhoto = await uploadFile(file)
console.log("Upload Photo : ",uploadPhoto)
setUploadPhoto(file)

setData((preve)=>{
  return{
    ...preve,
    profile_pic : uploadPhoto?.url
  }
})

}
const handleClearUpPhoto =(e)=>
{
  e.preventDefault()
  e.stopPropagation()
  setUploadPhoto(null)
}

const handeSubmit = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;

  try {
    const response = await axios.post(URL, data);
    console.log("response:", response);
    toast.success(response.data.message || "Registered successfully!");


    if(response.data.success){
      setData({
        name : "",
        email : "",
        password : "",
        profile_pic : ""

      })
      navigate('/email')
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Registration failed, please try again.";
    toast.error(errorMessage);
    console.log("Error:", error);
  }

  console.log("data:", data);
};


  return (
    <div className='mt-5'>
      
        <div className='bg-white w-full max-w-md   rounded overflow-hidden p-4 mx-auto'>
          <h3>Welcome to Chat on!</h3>

          <form className='grid gap-4 mt-5' onSubmit={handeSubmit}>
            <div className='flex flex-col gap-1 '>
              <label htmlFor='name'>
                Name :
              </label>
              <input
              type ='text'
              id='name'
              name='name'
              placeholder='Enter your name'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.name}
              onChange={handleOnchange}
              required
              />

            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor='email'>
                Email :
              </label>
              <input
              type ='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.email}
              onChange={handleOnchange}
              required
              />

            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor='password'>
                Password :
              </label>
              <input
              type ='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.password}
              onChange={handleOnchange}
              required
              />

            </div>

            <div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='profile_pic'>
                Photo :

                <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                  
                    <p className='text-sm max-w-[300] text-ellipsis line-clamp-1'>
                      {
                        uploadPhoto?.name ? uploadPhoto?.name : "Upload Profile Pic"
                      }
                      </p>
                      {
                        uploadPhoto?.name && (
                          <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUpPhoto}>
                          <IoMdClose/>
                          </button>

                        )
                      }
                     
                </div>
              </label>

            
            
              <input
              type ='file'
              id='profile_pic'
              name='profile_pic'
             
              className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
              onChange={handleUploadPhoto}
              
           />

            </div>

            </div>
            <button className='bg-primary text-lg px-2 py-1 hover:bg-secondary rounded mt-4 font-bold text-white leading-relaxed tracking-wider'>
              Register 
              </button>
          </form>

          <p className='my-3 text-center'>Already have an account? <Link to={"/email"} className='hover:text-primary font-semibold'> Login </Link> </p>
        </div> 
     
    </div>
  )
}

export default RegisterPage