import React from 'react';
import './Header.css';
const Header = props => {
  return (
    <div className={"header-container"}>
      <h1 className={"header-text"}>{props?.title??"Header"}</h1>
    </div>
  )
}

export default Header
