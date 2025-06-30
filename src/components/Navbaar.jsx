import React from 'react'

const Navbaar = () => {
    return (
        <div className='bg-blue-800 flex py-4 px-5 justify-between  text-red-300 ' >
            <div className="logo font-bold text-2xl">My Todo</div>
            <ul className='flex gap-10 align-middle px-3'>
                <li className='cursor-pointer hover:font-bold'>Home</li>
                <li className='cursor-pointer hover:font-bold'>About</li>
            </ul>
        </div>
    )
}

export default Navbaar
