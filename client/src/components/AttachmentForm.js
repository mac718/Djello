import React from 'react'

const AttachmentForm = ({ handleUploadFile, cardId, listId }) => {
  return (
    <form>
      <label for="attachment">Upload</label>
      <input
        className="input"
        type="file"
        name="attachment"
        onChange={(e) => handleUploadFile(e, cardId, listId)}
      />
      <button className="button" type="submit" />
      <img src="https://djello.s3-us-west-2.amazonaws.com/photo-56c0f3b6a377f6fc3a59866af3713f11.jpeg" />
    </form>
  )
}

export default AttachmentForm
