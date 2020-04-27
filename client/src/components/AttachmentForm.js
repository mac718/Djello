import React from 'react'

const AttachmentForm = ({ handleUploadFile, cardId, listId }) => {
  return (
    <form onSubmit={(e) => handleUploadFile(e, cardId, listId)}>
      <input
        className="input"
        type="file"
        name="attachment"
        accept=".png, jpeg, .gif, .jpg, .tiff"
      />
      <div className="upload-attachment">
        <button
          className="button upload-attachment-button is-primary is-light is-outlined"
          type="submit"
        >
          Upload
        </button>
      </div>
    </form>
  )
}

export default AttachmentForm
