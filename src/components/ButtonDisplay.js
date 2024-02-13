import React from 'react';
import './ButtonDisplay.css';

const ButtonDisplay = ({buttonList, buttonStyles}) => {
    // This component is responsible for arraging the buttons on the screen
    // buttonList is a 2D array

    // Check if passed prop is valid
    const buttonArrayList = buttonList && Array.isArray(buttonList) ? buttonList : [];

    return ( 
        <div>
          { 
            buttonArrayList.length != 0 ?
            buttonArrayList.map( (col, colIndex) => {
              const buttonDataArray = col?.buttonData && Array.isArray(col?.buttonData) ? col?.buttonData : []
              return (
                <div key={col?.id}>
                  {
                    buttonDataArray && buttonDataArray.map((button, rowIndex)=>{
                      return (<button key={button?.id} onClick={button?.funcX} type="button" className={buttonStyles[colIndex][rowIndex]??"default"}>{button?.text}</button>)
                    })
                  }
                </div>
              )
            })
            : 
            <p>You have no buttons to display</p>
          }
        </div>
    ) 
}

export default ButtonDisplay
