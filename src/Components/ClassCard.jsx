import React from 'react'
import './Cards.css'
import { MdCurrencyRupee } from "react-icons/md";
const ClassCard = ({ classInfo }) => {
  return (
    
     <div className="class-card">
        <div className='top'>
        <h6>{classInfo.Class}</h6>
        <div className='Price'><MdCurrencyRupee />{classInfo.Price}</div>
        </div>
        <div className='Seats'>
        <p> <span style={{color:"green" , fontWeight:"bolder"}}>AVL</span> {classInfo.Seats}</p>
        </div>
    
      <div className='Button_1'>
      <button className='Click'>Book Now</button>
      </div>
    
    </div>
   
  )
}

export default ClassCard
