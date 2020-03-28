import React from 'react'

const MemberDropdown = ({
  members,
  handleAddMemberToCard,
  handleSelectMemberFromDropdown,
  handleCardAttributeUpdate,
}) => {
  let memberList
  if (members) {
    memberList = members.map(member => {
      return (
        <a
          href="#"
          className="dropdown-item"
          onClick={handleSelectMemberFromDropdown}
          key={member._id}
        >
          {member.username}
        </a>
      )
    })
  }
  return (
    <form onSubmit={handleCardAttributeUpdate}>
      <div className="dropdown is-hoverable is-up">
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span id="dropdown-selection">Members</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">{memberList}</div>
        </div>
        <button
          type="submit"
          className="button is-light is-primary is-small is-outlined add-member-button"
        >
          + Add Member
        </button>
      </div>
    </form>
  )
}

export default MemberDropdown
