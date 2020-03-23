import React from 'react'

const CardDescriptionDisplay = ({
  description,
  handleSwitchToCardDescriptionForm,
}) => {
  return (
    <div className="card" onClick={handleSwitchToCardDescriptionForm}>
      <div className="card-content">{description}</div>
    </div>
  )
}

export default CardDescriptionDisplay
