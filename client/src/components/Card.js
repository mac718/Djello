import React from 'react'

const Card = ({ handleContentChange }) => {
  return (
    <div className="card control">
      <textarea
        className="card-content textarea is-hovered"
        onChange={handleContentChange}
      ></textarea>
    </div>
  )
}

export default Card
