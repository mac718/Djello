import React from 'react'

const CardMemberList = ({ members }) => {
  return (
    <div className="dropdown is-hoverable">
      <div className="dropdown-trigger">
        <span
          className="tag is-link is-light"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          Members
        </span>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {members.length > 0 ? members : 'no members yet'}
        </div>
      </div>
    </div>
  )
}

export default CardMemberList
