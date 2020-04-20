import React from 'react'

const CardTitleDisplay = ({ title, handleSwitchToCardTitleForm }) => {
  return (
    <div className="card-title-display" onClick={handleSwitchToCardTitleForm}>
      {title}
    </div>
  )
}

export default CardTitleDisplay
