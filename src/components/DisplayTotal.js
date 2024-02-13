import React from 'react';
import './DisplayTotal.css';

const DisplayTotal = props => {
  return (
    <div>
      <p>Numbers Selected:</p>
      <div className={"main_screen"}>
        <div className={"numList_screen"}>
            {
                props?.numbersList && props.numbersList.map(number=>{
                    return (
                        <p key={"NS"+number}>Mark: {number}</p>
                    )
                })
            }
        </div>
        <p>Total: {props?.total??0}</p>
      </div>
    </div>
  )
}

export default DisplayTotal
