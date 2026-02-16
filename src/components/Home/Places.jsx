import React from 'react'
import Site from './Site'

function Places() {

  return (
    <div className='flex-col pt-24 w-screen'>
        <strong className='px-10 py-5'>Places</strong>
        <div className='flex'>
            <Site place={"ShaniwarWada"} price={30} title={"shaniwar-wada.png"}/>
            <Site place={"Lohgad"} price={25} title={"lohagad.jpg"}/>
        </div>
    </div>
  )
}

export default Places