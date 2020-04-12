import React from 'react'

const Checkist = ({
  items,
  handleToggleCheck,
  handleAddItem,
  progressValue,
}) => {
  let listItems = items.map(item => {
    return (
      <div>
        <input
          type="checkbox"
          value={item}
          name={item}
          onClick={handleToggleCheck}
        />
        <label for={item}> {item}</label>
      </div>
    )
  })
  return (
    <div className="checklist content">
      <span>15%</span>
      <progress class="progress is-primary" value="15" max="100">
        15%
      </progress>
      {listItems}
      <button className="button is-light" onClick={handleAddItem}>
        Add an item
      </button>
    </div>
  )
}

export default Checkist
