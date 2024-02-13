import React, { useState } from 'react';
import '../css/Terminal.css';
import TerminalNumberButton from './TerminalNumberButton';

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
      <button className={"cash_btn"} onClick={cashFuncX?cashFuncX:()=>{}}>CASH</button>
      <button className={"clear_btn"} onClick={()=>{
        if(clearFuncX != null){
          clearFuncX(prev=> !prev); 
        }
      }}>CLEAR</button>
    </div>
  )
}

export default Terminal
