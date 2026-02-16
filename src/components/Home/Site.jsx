import React from 'react'
// import ShaniwarWada from '../assets/images/shaniwar-wada.png'
import { useData } from '../../Layout/Layout'
import { useBookContext } from '../../Context/BookContext'
function Site({place,title,price}) {
    const [data,setData] = useData()
    const {setPlaceVisible,setTimelineVisible} = useBookContext()

    const handleClick= () => {
        setData({...data, place:{
            name:place,
            price:price
        }})
        setPlaceVisible(false)
        setTimelineVisible(true)
    }
  return (
    <div onClick={handleClick} className='m-5  w-72 border-gray-600 border px-5 py-3 pt-5 hover:border-red-500 rounded-3xl hover:scale-105 transition-all duration-500 text-center'>
        <img src={`images/${title}`} className='rounded-3xl w-64 h-64 mb-2'/>
        <strong className='font-serif'>{place}</strong>
    </div>
  )
}

export default Site