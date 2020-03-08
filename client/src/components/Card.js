import React from 'react'

const Card = ({ handleContentChange, title }) => {
  return (
    <div className="card control">
      <textarea
        className="card-content textarea task is-hovered"
        onChange={handleContentChange}
        value={title}
        readOnly
      ></textarea>
    </div>
  )
}

export default Card
