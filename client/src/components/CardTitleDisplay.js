import React from 'react'

const CardTitleDisplay = ({ title, handleSwitchToCardTitleForm }) => {
  return (
    <div className="card" onClick={handleSwitchToCardTitleForm}>
      <div className="card-content">{title}</div>
    </div>
  )
}

export default CardTitleDisplay
