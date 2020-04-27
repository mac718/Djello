import React from 'react'

const AttachmentForm = ({ handleUploadFile, cardId, listId }) => {
  return (
    <form>
      <label htmlFor="attachment">Upload</label>
      <input
        className="input"
        type="file"
        name="attachment"
        accept=".png, jpeg, .gif, .jpg, .tiff "
        onChange={(e) => handleUploadFile(e, cardId, listId)}
      />
      <button className="button" type="submit" />
    </form>
  )
}

export default AttachmentForm
