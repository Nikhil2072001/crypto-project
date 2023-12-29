import React from 'react'
import './styles.css'
const Button = ({text, onClick, outlined}) => {
  return (
     <button className={outlined? "outline-btn" :'btn'}  onClick={onClick}>{text}</button>

  )
}

export default Button