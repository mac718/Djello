import React from 'react'

const CardMemberList = ({ members }) => {
  return (
    <div className="dropdown is-hoverable">
      <div className="dropdown-trigger">
        <span
          class="tag is-link is-light"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          Members
        </span>
        {/* <span
          className="icon"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <i className="fas fa-users"></i>
        </span> */}
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">{members}</div>
      </div>
    </div>
  )
}

export default CardMemberList
