import React from 'react'

const CardForm = ({ saveCard, handleHideCardForm }) => {
  return (
    <form>
      <textarea className="textarea"></textarea>
      <button className="button is-primary is-light" onSubmit={saveCard}>
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
