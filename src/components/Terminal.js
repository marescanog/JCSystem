import React from 'react';
import LotButton from './LotButton';

const Terminal = props => {
    const buttonList = props?.buttonList && Array.isArray(props?.buttonList) ? props?.buttonList : [];
    return (
        <div>
          {
            (props?.buttonList && Array.isArray(props?.buttonList)) && 
            props?.buttonList?.length != 0 ?
                props?.buttonList?.buttonList.map(el => <LotButton value={el?.value}  text={el?.text}/>)
            : 
            <p>You have no buttons to display</p>
          }
        </div>
    )
}

export default Terminal
