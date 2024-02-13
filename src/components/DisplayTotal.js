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
                        <p>Mark: {number}</p>
                    )
                })
            }
        </div>
        <p>Total: </p>
      </div>
    </div>
  )
}

export default DisplayTotal
