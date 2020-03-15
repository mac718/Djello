import React from 'react'

const CardModal = ({
  title,
  description,
  members,
  classes,
  handleActiveCardModal,
  id,
  handleDeleteCard,
  listId,
}) => {
  console.log('listId ' + listId)
  return (
    <div id={id} className={classes}>
      <span id={listId}></span>
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
        <div className="modal-card-body">
          <button
            className="button is-primary is-light"
            onClick={handleDeleteCard}
          >
            Mark as Complete
          </button>
          <div className="members">
            <p className="is-size-3">Members</p>
          </div>
          <form>
            <textarea defaultValue={description}></textarea>
            <div id="card-modal-buttons" className="field is-grouped">
              <p className="control">
                <button className="button is-primary" type="submit">
                  Save
                </button>
                <button className="button is-danger">Cancel</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CardModal
