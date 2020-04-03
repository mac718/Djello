import React from 'react'

const MemberSelectionDropdown = ({
  members,
  handleAddMemberToCard,
  handleSelectMemberFromDropdown,
  handleCardAttributeUpdate,
}) => {
  let repeat = false
  let memberArr = []
  let memberList = []
  if (members) {
    // members.forEach(member => {
    //   if (memberArr.includes(member.username)) {
    //     repeat = true
    //   } else {
    //     memberArr.push(member.username)
    //     memberList.push(
    //       <a
    //         href="#"
    //         className="dropdown-item"
    //         onClick={handleSelectMemberFromDropdown}
    //         key={member._id}
    //       >
    //         {member.username}
    //       </a>,
    //     )
    //   }
    // })
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

  let repeatNotification = repeat ? <p>Member already added!</p> : null
  return (
    <form className="member-selection" onSubmit={handleCardAttributeUpdate}>
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
      </div>
      <button
        type="submit"
        className="button is-light is-primary is-small is-outlined add-member-button"
      >
        + Add Member
      </button>
      {repeatNotification}
    </form>
  )
}

export default MemberSelectionDropdown
