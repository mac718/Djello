import React from 'react'

const MemberDropdown = ({ members, handleAddMemberToCard }) => {
  let memberList
  if (members) {
    memberList = members.map(member => {
      return (
        <a href="#" className="dropdown-item" onClick={handleAddMemberToCard}>
          {member.username}
        </a>
      )
    })
  }
  return (
    <div className="dropdown is-hoverable is-up">
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>Members</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">{memberList}</div>
      </div>
    </div>
  )
}

export default MemberDropdown
