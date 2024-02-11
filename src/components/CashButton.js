import React from 'react'

const CashButton = props => {
  return (
    <button onClick={()=>{alert(props?.value??"No Value Assigned")}}>$ {props?.text??"0"}</button>
  )
}

export default CashButton
