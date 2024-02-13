import React, {useEffect, useState}  from 'react';
import './DisplayTotal.css';

const DisplayTotal = props => {

  const [numberArr, setNumberArr] = useState(props?.numbersList??[]);

  useEffect(()=>{
    setNumberArr([...props?.numbersList]);
  },[props?.numbersList]);

  useEffect(()=>{
    setNumberArr([]);
  },[props?.clearState]);

  return (
    <div>
      <p>Numbers Selected:</p>
      <div className={"main_screen"}>
        <div className={"numList_screen"}>
            {
                numberArr && numberArr.map(number=>{
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
