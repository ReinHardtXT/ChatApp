import React from 'react'
import { HiOutlineUserCircle } from "react-icons/hi";
import { useSelector } from 'react-redux';

const Avatar = ({userID,name,imageUrl,width,height}) => {
    const onlineUser = useSelector(state => state?.user?.onlineUser)



    let avatarName = ""

    if(name){
        const splitName = name?.split(" ")


        if(splitName.length > 1){
            avatarName = splitName[0][0]+splitName[1][0]
        }else{
            avatarName = splitName[0][0]
        }
    }

    const bgColor = [
        'bg-slate-200',
        'bg-teal-200',
        'bg-red-200',
        'bg-green-200',
        'bg-yellow-200'
    ]

    const randomNumber = Math.floor(Math.random() * 5)

    const isOnline = onlineUser.includes(userID)
    //console.log(randomNumber)
  return (
    <div className={`text-slate-800  rounded-full  font-bold relative  `} style={{width : width+"px", height : height+"px"}}>
        {
            imageUrl ? (
                <img
                src={imageUrl}
                width={width}
                height={height}
                alt={name}
                />
            ) : (
                name ? (
                    <div style={{width : width+"px", height : height+"px"}}className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}>
                        {avatarName}
                    </div>
                ) :(
                    <HiOutlineUserCircle
               size={width}
                  />
                )
            )
}
{
    isOnline && (
        <div className='bg-green-500 p-2 absolute bottom-2 right-0 z-10 rounded-full'> </div>

    )
}
        

    </div>
  )
}

export default Avatar