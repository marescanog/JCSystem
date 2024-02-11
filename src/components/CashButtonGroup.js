import React from 'react'
import CashButton from './CashButton'

const CashButtonGroup = props => {
  return (
    <div>
      {
        (props?.buttonList && Array.isArray(props?.buttonList)) && 
        props?.buttonList?.length != 0 ?
            props?.buttonList?.buttonList.map(el => <CashButton value={el?.value}  text={el?.text}/>)
        : 
        <p>You have no buttons to display</p>
      }
    </div>
  )
}

export default CashButtonGroup
