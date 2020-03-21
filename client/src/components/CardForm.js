import React from 'react'

const CardForm = ({
  handleSaveCard,
  handleHideCardForm,
  handleTitleChange,
}) => {
  return (
    <form onSubmit={handleSaveCard}>
      <textarea className="textarea" onChange={handleTitleChange}></textarea>
      <div className="field is-grouped" id="cardForm-buttons">
        <p className="control">
          <button
            className="button is-primary is-light"
            type="submit"
            //onClick={handleHideCardForm}
          >
            save
          </button>
        </p>
        <p className="control">
          <button
            className="button is-danger is-light"
            onClick={handleHideCardForm}
          >
            cancel
          </button>
        </p>
      </div>
    </form>
  )
}

export default CardForm
