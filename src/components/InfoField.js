import React from 'react'
import '../styles/App.css'

function InfoField({name,info}) {

  return (
    <div className='info-field'>
        <h2>{name}</h2>

        <h2 style={{wordBreak: "break-all"}}>{info}</h2>
        
    </div>
  )
}

export default InfoField