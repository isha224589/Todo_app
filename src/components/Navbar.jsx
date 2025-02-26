import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-600 '>
        <div className="mycontainer  text-white  flex h-14 justify-between items-center px-4 py-5">
        <div className="logo font-bold text-2xl">
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>OP/&gt;</span></div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="">Home</a>
                <a className='hover:font-bold' href="">Contact</a>
                <a className='hover:font-bold' href="">About</a>
            </li>
        </ul> */}
        <button className='flex justify-center items-center rounded-full text-white ring-1 ring-white bg-green-700'>
            <img className='invert py-1' width={24} src="github.svg" alt="github-logo" />
            <span className='font-bold px-2'>Github</span>
        </button>
        </div>
    </nav>
  )
}

export default Navbar
