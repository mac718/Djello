import React from 'react'

const Card = ({ handleContentChange, title }) => {
  return (
    <div className="card control">
      <div
        className="card-content"
        className="card-content textarea task is-hovered"
      >
        {title}
      </div>
    </div>
  )
}

export default Card
