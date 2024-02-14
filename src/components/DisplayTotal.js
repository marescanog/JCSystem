import React, {useEffect, useState}  from 'react';
import '../css/DisplayTotal.css';

const DisplayTotal = props => {

  const [numberArr, setNumberArr] = useState(props?.numbersList??[]);

  useEffect(()=>{
    setNumberArr([...props?.numbersList]);
  },[props?.numbersList]);

  useEffect(()=>{
    setNumberArr([]);
  },[props?.clearState]);

  return (
    <div className={"display_container"}>
      <div className={"display_inner_container"}>
        <p className={"display_headertext"}>Numbers Selected :</p>
        <div className={"main_screen"}>
          <div className={"numList_screen"}>
              {
                  numberArr && numberArr.map(number=>{
                      return (
                          <p className={"display_text"} key={"NS"+number}>Mark: {number}</p>
                      )
                  })
              }
          </div>
          <p className={"display_footertext"}>Total: ${props?.total?props.total.toFixed(2):0}</p>
        </div>
      </div>
    </div>
  )
}

export default DisplayTotal
