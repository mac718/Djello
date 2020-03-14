import React from 'react'

const CardModal = ({
  title,
  description,
  members,
  classes,
  handleActiveCardModal,
  id,
}) => {
  return (
    <div id={id} className={classes}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleActiveCardModal}
          ></button>
        </div>
        <div>{description}</div>
      </div>
    </div>
  )
}

export default CardModal
