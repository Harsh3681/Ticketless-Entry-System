import React from 'react'

function Spinner() {
  return (
    <div className='w-full bg-[#363636] h-full flex justify-center items-center fixed z-1'>
        <div className='w-16 h-16 border-8 border-t-[#f02e65] border-r-transparent border-b-[#f02e65] border-l-transparent rounded-full bg-black/83 animate-spin'></div>
    </div>
  )
}

export default Spinner