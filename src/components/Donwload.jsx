import React from 'react'
import { Link } from 'react-router-dom'

function Donwload() {

  return (
    <div className='grid bg-[#212121] text-center content-center justify-center h-screen w-screen'>
        <strong className="text-white">
            App
        </strong>
        <div className='m-5 border-gray-600 border px-5 py-3 pt-5 hover:border-red-500 rounded-3xl hover:scale-105 transition-all duration-500 text-center'>
            <img src={`images/logo.png`} className='rounded-3xl w-40 h-40 mb-5'/>
            <Link to={'/ticktr.apk'} target='_blank' download={true} className='rounded-full w-32 bg-red-500 text-white py-2 px-6'>Download</Link>
        </div>
    </div>
  )
}

export default Donwload