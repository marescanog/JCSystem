import React from 'react';
import TerminalNumberButton from './TerminalNumberButton';
import '../css/Terminal.css';
import textButton from '../images/textbutton.png'

const Terminal = ({funcX, cashFuncX, clearFuncX, clearState, randState=Array(20)}) => {

  const values = Array.from(Array(20).keys());

  return (
    <div className={"grid-container"}>
      {
        values.map((el)=>{
          let val = el+1;
          return <TerminalNumberButton key={"TB"+el} value={val} funcX={funcX} clearState={clearState} randState={randState[el]}/>
        })
      }
      <button className={"cash_btn"} onClick={cashFuncX?cashFuncX:()=>{}}>
        <p className={"cash_btn_txt_style"}>CASH</p>
        <img className={"btn_img"} src={textButton} alt={"CASH"}/>
      </button>
      <button className={"clear_btn"} onClick={()=>{
        if(clearFuncX != null){
          clearFuncX(prev=> !prev); 
        }
      }}>
        <p className={"clear_btn_txt_style"}>CLEAR</p>
        <img className={"btn_img"} src={textButton} alt={"CLEAR"}/>
      </button>
    </div>
  )
}

export default Terminal
