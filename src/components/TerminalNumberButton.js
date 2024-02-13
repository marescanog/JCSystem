import React, {useState, useEffect} from 'react';
import './TerminalNumberButton.css';

const TerminalNumberButton = props => {
  const [isSelected, setIsSelected] = useState(false); 

  useEffect(()=>{
    setIsSelected(false);
  },[props.clearState]);

  useEffect(()=>{
    setIsSelected(props.randState);
  },[props.randState]);

  return (
    <button onClick={()=>{
        if(props?.funcX != null){
            if(props?.funcX(props?.value)){
                setIsSelected(prev => !prev);
            }
        }
    }} className={isSelected?"selected":"unselected"}>
        <div className={"borderStyle"}>
            <div className={"buttonStyle"}>
                {props.value}
            </div>
        </div>
    </button>
  )
}

export default TerminalNumberButton
