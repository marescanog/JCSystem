import React from 'react'

const Header = props => {
  return (
    <div>
      <h1>{props?.title??"Header"}</h1>
    </div>
  )
}

export default Header
