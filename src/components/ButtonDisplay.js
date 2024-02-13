import React from 'react';
import './ButtonDisplay.css';

const ButtonDisplay = ({buttonList, buttonStyles, containerStyle}) => {
    // This component is responsible for arraging the buttons on the screen
    // buttonList is a 2D array

    // Check if passed prop is valid
    const buttonArrayList = buttonList && Array.isArray(buttonList) ? buttonList : [];

    return ( 
        <div className={containerStyle??"default__containerStyle"}>
          { 
            buttonArrayList.length != 0 ?
            buttonArrayList.map( (col, colIndex) => {
              const buttonDataArray = col?.buttonData && Array.isArray(col?.buttonData) ? col?.buttonData : []
              return (
                <div key={col?.id} className={col?.rowStyle??"default__rowStyle"}>
                  {
                    buttonDataArray && buttonDataArray.map((button, rowIndex)=>{
                      return (<button key={button?.id} onClick={button?.funcX} type="button" className={buttonStyles[colIndex][rowIndex]??"default"}>
                          <p className={button?.textStyle??"default_btn_textStyle"}>{button?.text}</p>
                          {button?.buttonBackgroundImage && <img src={button?.buttonBackgroundImage} alt={`$${button?.value}`} className={button?.buttonBackgroundImageStyle??"default_btn_img_style"}/>}
                        </button>)
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
