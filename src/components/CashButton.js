import React from 'react';
import './CashButton.css';
import cashButtonBG from '../images/cashbutton.png';

const CashButton = ({value, funcX}) => {
  return (
    <button className={'cashButton'} onClick={()=>{funcX(value);}}>
        <p className={'casht_btn_textStyle_'+value}>${value}</p>
        <img src={cashButtonBG} className={'cashButton_image_style'}/>
    </button>
)
}

export default CashButton
