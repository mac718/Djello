import React from 'react'

const CardTitleDisplay = ({ title, handleSwitchToCardTitleForm }) => {
  return <div onClick={handleSwitchToCardTitleForm}>{title}</div>
}

export default CardTitleDisplay
