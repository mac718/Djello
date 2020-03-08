import React from 'react'

const CardForm = ({
  handleSaveCard,
  handleHideCardForm,
  handleTitleChange,
}) => {
  return (
    <form onSubmit={handleSaveCard}>
      <textarea className="textarea" onChange={handleTitleChange}></textarea>
      <button
        className="button is-primary is-light"
        onClick={handleHideCardForm}
      >
        save
      </button>
      <button
        className="button is-danger is-light"
        onClick={handleHideCardForm}
      >
        cancel
      </button>
    </form>
  )
}

export default CardForm
