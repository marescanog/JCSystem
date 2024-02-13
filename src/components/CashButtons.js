import React from 'react'
import CashButton from './CashButton';
import '../css/CashButtons.css'

const CashButtons = ({funcX}) => {
  const cashValues = [1, 5, 10, 20];
  return (
    <div className={"cb-grid"}>
      {cashValues.map(el=>{
        return <CashButton key={"CASHB"+el} value={el} funcX={funcX}/> 
      })}
    </div>
  )
}

export default CashButtons
