import React from 'react'

const Footer = () => {
  return (
    <>
    
    <div className='flex text-white flex-col justify-center w-full bottom-0 items-center bg-slate-800'>
    <div className="logo text-white font-bold  text-2xl">
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>OP/&gt;</span></div>
    <div className='flex justify-center items-center'>
      Created with <img className='w-7 m-2' src="/heart.png" alt="" />by Isha
    </div>
    </div>
    </>
  )
}

export default Footer
