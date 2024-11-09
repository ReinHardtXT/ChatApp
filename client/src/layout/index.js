import React from 'react'
import logo from '../assets/logo.png'
const AuthLayouts = ({children}) => {
  return (
   <>
    <div>
        <header className='flex justify-center items-center py-3 h-32 shadow-lg bg-white'>
        <img
        src={logo}
        alt='logo'
        width={180}
        height={60}
        />
        </header>
       
    </div>
    
    {children}
   </>
  )
}

export default AuthLayouts 