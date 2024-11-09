import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom"
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';
import { HiOutlineUserCircle } from "react-icons/hi";




const CheckEmailPage = () => {
  const [data,setData] = useState({
    email : "",

  })

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



const handeSubmit = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;

  try {
    const response = await axios.post(URL, data)
    toast.success(response.data.message || "Registered successfully!");


    if(response.data.success){
      setData({
        email : "",
        

      })
      navigate('/password',{
        state : response?.data?.data
      })
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Registration failed, please try again.";
    toast.error(errorMessage);
    console.log("Error:", error);
  }

 
};
  return (
    <div className='mt-5'>
      
        <div className='bg-white w-full max-w-md   rounded overflow-hidden p-4 mx-auto'>

          <div className='w-fit mx-auto mb-2'>
            <HiOutlineUserCircle
            size={80}
            />
            
          </div>
          <h3>Welcome to Chat on!</h3>

          <form className='grid gap-4 mt-3' onSubmit={handeSubmit}>
           

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

           
            <button className='bg-primary text-lg px-2 py-1 hover:bg-secondary rounded mt-4 font-bold text-white leading-relaxed tracking-wider'>
              Login 
              </button>
          </form>

          <p className='my-3 text-center'>New User? <Link to={"/register"} className='hover:text-primary font-semibold'>Register </Link> </p>
        </div> 
     
    </div>
  )
}

export default CheckEmailPage