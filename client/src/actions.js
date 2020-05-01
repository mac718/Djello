var _ = require('lodash')

export const GET_DATA_REQUEST = 'GET_DATA_REQUEST'
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'
export const GET_DATA_FAILURE = 'GET_DATA_FAILURE'

export const HANDLE_USERNAME_INPUT_CHANGE = 'HANDLE_USERNAME_INPUT_CHANGE'
export const HANDLE_PASSWORD_INPUT_CHANGE = 'HANDLE_PASSWORD_INPUT_CHANGE'
export const SET_CURRENT_BOARD = 'SET_CURRENT_BOARD'
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'
export const CHANGE_BOARD_NAME = 'CHANGE_BOARD_NAME'
export const CREATE_CARD_FORM = 'CREAT_CARD_FORM'
export const HIDE_CARD_FORM = 'HIDE_CARD_FORM'
export const CHANGE_TITLE = 'CHANGE_TITLE'
export const CHANGE_ACTIVE_CARD_MODAL = 'CHANGE_ACTIVE_CARD_MODAL'
export const EDIT_CARD_TITLE = 'EDIT_CARD_TITLE'
export const EDIT_CARD_DESCRIPTION = 'EDIT_CARD_DESCRIPTION'
export const CHANGE_SHOW_BOARD_NAME_DISPLAY = 'SHOW_BOARD_NAME_DISPLAY'
export const SWITCH_TO_CARD_DESCRIPTION_FORM = 'SWITCH_TO_CARD_DESCRIPTION_FORM'
export const SWITCH_TO_CARD_DESCRIPTION_DISPLAY =
  'SWITCH_TO_CARD_DESCRIPTION_DISPLAY'
export const SWITCH_TO_CARD_TITLE_FORM = 'SWITCH_TO_CARD_TITLE_FORM'
export const SWITCH_TO_CARD_TITLE_DISPLAY = 'SWITCH_TO_CARD_TITLE_DISPLAY'
export const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING'
export const REDIRECT_AFTER_LOGOUT = 'REDIRECT_AFTER_LOGOUT'
export const UPDATE_USER_LIST = 'UPDATE_USER_LIST'
export const SELECT_MEMBER_FROM_DROPDOWN = 'SELECT_MEMBER_FROM_DROPDOWN'
export const DISPLAY_DUPLICATE_MEMBER_WARNING =
  'DISPLAY_DUPLICATE_MEMBER_WARNING'
export const CLOSE_DUPLICATE_MEMBER_WARNING = 'CLOSE_DUPLICATE_MEMBER_WARNING'
export const UPDATE_ACTIVE_BOARD_LISTS = 'UPDATE_ACTIVE_BOARD_LISTS'
export const SET_CURRENT_LIST_AND_CARD = 'SET_CURRENT_LIST_AND_CARD'
export const SHOW_ADD_ITEM_FORM = 'SHOW_ADD_ITEM_FORM'
export const HIDE_ADD_ITEM_FORM = 'HIDE_ADD_ITEM_FORM'
export const DISPLAY_CHECKLIST_TITLE_FORM = 'DISPLAY_CHECKLIST_TITLE_FORM'
export const HIDE_CHECKLIST_TITLE_FORM = 'HIDE_CHECKLIST_TITLE_FORM'
export const OPEN_MEMBER_DROPDOWN = 'OPEN_MEMBER_DROPDOWN'
export const ACTIVATE_MEMBER_LIST_DROPDOWN = 'ACTIVATE_MEMBER_LIST_DROPDOWN'
export const EDIT_CHECKLIST_ITEM_FORM = 'EDIT_CHECKLIST_ITEM_FORM'
export const SHOW_DELETE_LIST_WARNING_MODAL = 'SHOW_DELETE_LIST_WARNING_MODAL'
export const CLOSE_DELETE_LIST_WARNING_MODAL = 'CLOSE_DELETE_LIST_WARNING_MODAL'
export const SHOW_DELETE_BOARD_WARNING_MODAL = 'SHOW_DELETE_BOARD_WARNING_MODAL'
export const CLOSE_DELETE_BOARD_WARNING_MODAL =
  'CLOSE_DELETE_BOARD_WARNING_MODAL'
export const SHOW_DELETE_CARD_WARNING_MODAL = 'SHOW_DELETE_CARD_WARNING_MODAL'
export const CLOSE_DELETE_CARD_WARNING_MODAL = 'CLOSE_DELETE_CARD_WARNING_MODAL'
export const EDIT_CHECKLIST_TITLE_FORM = 'EDIT_CHECKLIST_TITLE_FORM'
export const TOGGLE_ADD_ATTACHMENT_DROPDOWN = 'TOGGLE_ADD_ATTACHMENT_DROPDOWN'
export const CLOSE_ADD_ATTACHMENT_DROPDOWN = 'CLOSE_ADD_ATTACHMENT_DROPDOWN'
export const OPEN_ATTACHEMENT_MODAL = 'OPEN_ATTACHEMENT_MODAL'

export function getDataRequest() {
  return {
    type: GET_DATA_REQUEST,
  }
}

export function getDataSuccess(data) {
  return {
    type: GET_DATA_SUCCESS,
    data,
  }
}

export function getDataFailure(error) {
  return {
    type: GET_DATA_FAILURE,
    error,
  }
}

export function handleUsernameInputChange(data) {
  return {
    type: HANDLE_USERNAME_INPUT_CHANGE,
    data,
  }
}

export function handlePasswordInputChange(data) {
  return {
    type: HANDLE_PASSWORD_INPUT_CHANGE,
    data,
  }
}

export function setCurrentBoard(data) {
  return {
    type: SET_CURRENT_BOARD,
    data,
  }
}

export function updateCurrentUser(data) {
  return {
    type: UPDATE_CURRENT_USER,
    data,
  }
}

export function createCardForm(listId) {
  return {
    type: CREATE_CARD_FORM,
    listId,
  }
}

export function hideCardForm() {
  return {
    type: HIDE_CARD_FORM,
  }
}

export function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    title,
  }
}

export function changeActiveCardModal(id) {
  return {
    type: CHANGE_ACTIVE_CARD_MODAL,
    id,
  }
}

export function editCardTitle(title) {
  return {
    type: EDIT_CARD_TITLE,
    title,
  }
}

export function editCardDescription(description) {
  return {
    type: EDIT_CARD_DESCRIPTION,
    description,
  }
}

export function changeShowBoardNameDisplay() {
  return {
    type: CHANGE_SHOW_BOARD_NAME_DISPLAY,
  }
}

export function switchToCardDescriptionForm() {
  return {
    type: SWITCH_TO_CARD_DESCRIPTION_FORM,
  }
}

export function switchToCardDescriptionDisplay() {
  return {
    type: SWITCH_TO_CARD_DESCRIPTION_DISPLAY,
  }
}

export function switchToCardDTitleForm() {
  return {
    type: SWITCH_TO_CARD_TITLE_FORM,
  }
}

export function switchToCardTItleDisplay() {
  return {
    type: SWITCH_TO_CARD_TITLE_DISPLAY,
  }
}

export function toggleIsLoading() {
  return {
    type: TOGGLE_IS_LOADING,
  }
}

export function redirectAfterLogout() {
  return {
    type: REDIRECT_AFTER_LOGOUT,
  }
}

export function updateUserList(users) {
  return {
    type: UPDATE_USER_LIST,
    users,
  }
}

export function selectMemberFromDropdown(member) {
  return {
    type: SELECT_MEMBER_FROM_DROPDOWN,
    member,
  }
}

export function displayDuplicateMemberWarning() {
  return {
    type: DISPLAY_DUPLICATE_MEMBER_WARNING,
  }
}

export function closeDuplicateMemberWarning() {
  return {
    type: CLOSE_DUPLICATE_MEMBER_WARNING,
  }
}

export function updateActiveBoardLists(lists) {
  return {
    type: UPDATE_ACTIVE_BOARD_LISTS,
    lists,
  }
}

export function setCurrentListAndCard(listAndCard) {
  return {
    type: SET_CURRENT_LIST_AND_CARD,
    listAndCard,
  }
}

export function showAddItemForm(checklistId) {
  return {
    type: SHOW_ADD_ITEM_FORM,
    checklistId,
  }
}

export function hideAddItemForm() {
  return {
    type: HIDE_ADD_ITEM_FORM,
  }
}

export function displayChecklistTitleForm(checklistId) {
  return {
    type: DISPLAY_CHECKLIST_TITLE_FORM,
    checklistId,
  }
}

export function HideChecklistTitleForm() {
  return {
    type: HIDE_CHECKLIST_TITLE_FORM,
  }
}

export function openMemberDropdown() {
  return {
    type: OPEN_MEMBER_DROPDOWN,
  }
}

export function activateMemberListDropdown() {
  return {
    type: ACTIVATE_MEMBER_LIST_DROPDOWN,
  }
}

export function editChecklistItemForm(item) {
  return {
    type: EDIT_CHECKLIST_ITEM_FORM,
    item,
  }
}

export function showDeleteListWarningModal(listId) {
  return {
    type: SHOW_DELETE_LIST_WARNING_MODAL,
    listId,
  }
}

export function closeDeleteListWarningModal() {
  return {
    type: CLOSE_DELETE_LIST_WARNING_MODAL,
  }
}

export function showDeleteBoardWarningModal(boardId) {
  return {
    type: SHOW_DELETE_BOARD_WARNING_MODAL,
    boardId,
  }
}

export function closeDeleteBoardWarningModal() {
  return {
    type: CLOSE_DELETE_BOARD_WARNING_MODAL,
  }
}

export function showDeleteCardWarningModal(cardId) {
  return {
    type: SHOW_DELETE_CARD_WARNING_MODAL,
    cardId,
  }
}

export function closeDeleteCardWarningModal() {
  return {
    type: CLOSE_DELETE_CARD_WARNING_MODAL,
  }
}

export function editChecklistTitleForm(checklistTitle) {
  return {
    type: EDIT_CHECKLIST_TITLE_FORM,
    checklistTitle,
  }
}

export function toggleAddAttachmentDropdown(cardId) {
  return {
    type: TOGGLE_ADD_ATTACHMENT_DROPDOWN,
    cardId,
  }
}

export function closeAddAttachmentDropdown() {
  return {
    type: CLOSE_ADD_ATTACHMENT_DROPDOWN,
  }
}

export function openAttachmentModal(url) {
  return {
    type: OPEN_ATTACHEMENT_MODAL,
    url,
  }
}

//handles register and login
export function handleSubmit(e, route) {
  return (dispatch, getState) => {
    e.preventDefault()
    let state = getState()
    let username = state.username
    let password = state.password

    fetch(route, {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        } else {
          console.log('no')
          const error = new Error(res.error)
          throw error
        }
      })
      .then((json) => {
        console.log('submit ' + JSON.stringify(json))
        dispatch(getDataSuccess(json))
      })
      .catch((err) => {
        console.log(err)
        dispatch(getDataFailure(err))
        alert('Error logging in')
      })
  }
}

export function handleLogOut(e) {
  return (dispatch) => {
    fetch('/logout', {
      method: 'POST',
    })
      .then(() => dispatch(redirectAfterLogout()))
      .catch((err) => {
        console.log(err)
        dispatch(getDataFailure(err))
        alert('Error logging out')
      })
  }
}

export function createBoard(e) {
  return (dispatch, getState) => {
    let state = getState()
    let currentUser = state.currentUser
    fetch('/createBoard', {
      method: 'POST',
      body: JSON.stringify({ currentUser }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch((err) => {
        alert(err)
      })
  }
}

export function createList(e) {
  return (dispatch, getState) => {
    let state = getState()

    fetch('/createList', {
      method: 'POST',
      body: JSON.stringify({ activeBoard: state.currentUser.activeBoard }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch(getDataFailure(err))
        alert(err)
      })
  }
}

export function deleteList(listId) {
  return (dispatch, getState) => {
    let state = getState()
    let currentUser = state.currentUser
    fetch('/deleteList', {
      method: 'DELETE',
      body: JSON.stringify({ listId, currentUser }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch((err) => {
        alert(err)
      })
  }
}

export function deleteBoard(id) {
  return (dispatch, getState) => {
    let state = getState()
    let currentUser = state.currentUser
    fetch('/deleteBoard', {
      method: 'DELETE',
      body: JSON.stringify({ board: id, currentUser }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.error) {
          alert(JSON.stringify(json.error))
        } else {
          console.log('current User ' + JSON.stringify(json))
          dispatch(updateCurrentUser(json))
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch(getDataFailure(err))
        alert(err)
      })
  }
}

export function changeName(e, componentName, route) {
  return (dispatch, getState) => {
    let listId
    if (route === '/changeListName') {
      listId = e.target.parentElement.parentElement.id
    }
    if (route === '/changeBoardName') {
      document.getElementById('board-name').innerHTML = ''
      e.target.value = ''
    }
    let state = getState()
    let currentUser = state.currentUser
    fetch(route, {
      method: 'PUT',
      body: JSON.stringify({ componentName, currentUser, listId }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          if (route === '/changeListName') {
            dispatch(updateActiveBoardLists(json.lists))
            dispatch(updateCurrentUser(json.user))
          } else {
            dispatch(updateCurrentUser(json.user))
          }
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }
}

export function saveCard(e) {
  return (dispatch, getState) => {
    e.preventDefault()
    dispatch(hideCardForm())
    let state = getState()
    let currentUser = state.currentUser
    let listId = e.target.parentElement.id
    let title = state.cardTitle
    fetch('/createCard', {
      method: 'POST',
      body: JSON.stringify({ listId, currentUser, title }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }
}

export function deleteCard(cardId, listId) {
  return (dispatch, getState) => {
    let state = getState()
    let currentUser = state.currentUser
    fetch('deleteCard', {
      method: 'DELETE',
      body: JSON.stringify({ cardId, listId, currentUser }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }
}

export function switchActiveBoard(e) {
  return (dispatch, getState) => {
    let state = getState()
    let currentUser = state.currentUser
    let boardId = e.target.id

    fetch('switchActiveBoard', {
      method: 'PATCH',
      body: JSON.stringify({ boardId, currentUser }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }
}

export function updateCardTitle(e, listId, cardId) {
  return (dispatch, getState) => {
    dispatch(toggleIsLoading())

    let state = getState()
    let cardTitle = state.cardTitle
    let currentUser = state.currentUser

    dispatch(switchToCardTItleDisplay())

    fetch('/updateCardTitle', {
      method: 'PUT',
      body: JSON.stringify({
        cardTitle,
        currentUser,
        listId,
        cardId,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }
}

export function updateCardDescription(e) {
  return (dispatch, getState) => {
    dispatch(toggleIsLoading())
    dispatch(switchToCardDescriptionDisplay())

    let state = getState()
    let cardDescription = state.cardDescription
    let currentUser = state.currentUser
    let cardId = e.target.parentElement.parentElement.parentElement.id
    let listId =
      e.target.parentElement.parentElement.parentElement.firstChild.id

    fetch('/updateCardDescription', {
      method: 'PUT',
      body: JSON.stringify({
        cardDescription,
        currentUser,
        listId,
        cardId,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }
}

export function addMemberToCard(e) {
  return (dispatch, getState) => {
    dispatch(toggleIsLoading())

    let state = getState()
    let memberUsername = state.memberToAdd
    let currentUser = state.currentUser
    let cardId =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.id
    let listId =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.firstChild.id

    fetch('/addMemberToCard', {
      method: 'PUT',
      body: JSON.stringify({
        memberUsername,
        currentUser,
        listId,
        cardId,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        console.log('res ' + JSON.stringify(res))
        if (res.status === 500) {
          return res
        } else {
          return res.json()
        }
      })
      .then((json) => {
        if (json.status === 500) {
          dispatch(displayDuplicateMemberWarning())
        } else {
          if (json.err) {
            alert(json.err)
          } else {
            dispatch(updateActiveBoardLists(json.lists))
            dispatch(updateCurrentUser(json.user))
            dispatch(addBoardToMember())
          }
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }
}

export function getAllUsers() {
  return (dispatch) => {
    fetch('/getAllUsers')
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateUserList(json))
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }
}

export function addBoardToMember() {
  return (dispatch, getState) => {
    let state = getState()
    let username = state.memberToAdd
    let boardId = state.currentUser.activeBoard

    fetch('/addBoardToMember', {
      method: 'POST',
      body: JSON.stringify({ username, boardId }),
      headers: {
        'Content-type': 'application/json',
      },
    }).catch((err) => {
      console.log(err)
      alert(err)
    })
  }
}

export function deleteMemberFromCard(e) {
  return (dispatch, getState) => {
    let state = getState()
    let currentUser = state.currentUser
    let cardId =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.id
    let listId =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.firstChild.id
    let username = e.target.previousSibling.innerHTML

    fetch('/deleteMemberFromCard', {
      method: 'DELETE',
      body: JSON.stringify({ username, cardId, listId, currentUser }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }
}

export function changeActiveBoardLists(
  source,
  destination,
  draggableId,
  stateLists,
  sourceList,
  destinationList,
  draggedCard,
  sourceListIndex,
  destinationListIndex,
) {
  return (dispatch) => {
    let lists = stateLists

    if (
      JSON.stringify(sourceList._id) === JSON.stringify(destinationList._id)
    ) {
      sourceList.cards.splice(source.index, 1)

      sourceList.cards.splice(destination.index, 0, draggedCard)

      lists.splice(sourceListIndex, 1, sourceList)
      dispatch(updateActiveBoardLists(lists))
    } else {
      sourceList.cards.splice(source.index, 1)
      destinationList.cards.splice(destination.index, 0, draggedCard)
      lists.splice(sourceListIndex, 1, sourceList)

      lists.splice(destinationListIndex, 1, destinationList)

      dispatch(updateActiveBoardLists(lists))
    }
  }
}

export function onDragEnd(result) {
  return (dispatch, getState) => {
    let state = getState()
    let lists = Array.from(state.activeBoardLists)
    let currentUser = state.currentUser

    const { destination, source, draggableId } = result

    let sourceListIndex
    let destinationListIndex
    let sourceList
    let destinationList
    let draggedCard

    Promise.resolve(
      (sourceList = lists.filter((list) => {
        return JSON.stringify(source.droppableId) === JSON.stringify(list._id)
      })[0]),
      lists.forEach((list, index) => {
        if (JSON.stringify(list._id) === JSON.stringify(source.droppableId)) {
          sourceListIndex = index
        }
      }),
      (destinationList = lists.filter((list) => {
        return (
          JSON.stringify(destination.droppableId) === JSON.stringify(list._id)
        )
      })[0]),
      lists.forEach((list, index) => {
        if (
          JSON.stringify(list._id) === JSON.stringify(destination.droppableId)
        ) {
          destinationListIndex = index
        }
      }),
      (draggedCard = sourceList.cards.filter((card) => {
        return JSON.stringify(card._id) === JSON.stringify(draggableId)
      })[0]),
    ).then(() => {
      if (!destination) {
        return
      }

      if (
        destination.draoppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return
      }

      dispatch(
        changeActiveBoardLists(
          source,
          destination,
          draggableId,
          lists,
          sourceList,
          destinationList,
          draggedCard,
          sourceListIndex,
          destinationListIndex,
        ),
      )
    })

    fetch('/updateListAfterDnD', {
      method: 'PUT',
      body: JSON.stringify({
        currentUser,
        destination,
        source,
        draggableId,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateCurrentUser(json))
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }
}

export function createChecklist(cardId, listId) {
  return (dispatch, getState) => {
    let state = getState()
    let currentUser = state.currentUser

    fetch('/createChecklist', {
      method: 'POST',
      body: JSON.stringify({ cardId, listId, currentUser }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }
}

export function addChecklistItem(e) {
  return (dispatch, getState) => {
    let state = getState()
    let currentUser = state.currentUser
    let checklistId = e.target.parentElement.id
    let cardId =
      e.target.parentElement.parentElement.parentElement.parentElement.id
    let listId =
      e.target.parentElement.parentElement.parentElement.parentElement
        .firstChild.id
    let checklistItemContent = state.checklistItem

    fetch('./addChecklistItem', {
      method: 'POST',
      body: JSON.stringify({
        currentUser,
        checklistId,
        cardId,
        listId,
        checklistItemContent,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.error) {
          alert(
            'Uh oh, something went wrong: ' +
              JSON.stringify(json.error.message),
          )
        } else {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }
}

export function checkChecklistItem(e) {
  return (dispatch, getState) => {
    let state = getState()
    let currentUser = state.currentUser
    let checklistItemId = e.target.parentElement.id
    let checklistId = e.target.parentElement.parentElement.id
    let cardId =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.id
    let listId =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.firstChild.id
    let attributeType = state.attributeType
    let cardAttributeContent = state.cardAttributeContent

    fetch('/checkChecklistItem', {
      method: 'PATCH',
      body: JSON.stringify({
        currentUser,
        checklistItemId,
        checklistId,
        cardId,
        listId,
        attributeType,
        cardAttributeContent,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }
}

export function updateChecklistTitle(e) {
  return (dispatch, getState) => {
    let state = getState()
    let currentUser = state.currentUser
    let checklistId = e.target.parentElement.id
    let cardId =
      e.target.parentElement.parentElement.parentElement.parentElement.id
    let listId =
      e.target.parentElement.parentElement.parentElement.parentElement
        .firstChild.id
    let title = state.checklistTitle

    fetch('/updateChecklistTitle', {
      method: 'PATCH',
      body: JSON.stringify({ checklistId, currentUser, title, cardId, listId }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }
}

export function deleteChecklist(e) {
  return (dispatch, getState) => {
    let state = getState()
    let currentUser = state.currentUser
    let checklistId = e.target.parentElement.parentElement.parentElement.id
    let cardId =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.id
    let listId =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.firstChild.id

    fetch('/deleteChecklist', {
      method: 'DELETE',
      body: JSON.stringify({ checklistId, currentUser, cardId, listId }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }
}

export function addAttachmentUrlToCard(url, cardId, listId) {
  return (dispatch, getState) => {
    let state = getState()
    let currentUser = state.currentUser

    fetch('/addAttachmentUrlToCard', {
      method: 'POST',
      body: JSON.stringify({ url, cardId, listId, currentUser }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(updateCurrentUser(json.user))
          dispatch(updateActiveBoardLists(json.lists))
        }
      })
  }
}

export function uploadFile(files, cardId, listId) {
  return (dispatch, getState) => {
    let formData = new FormData()
    formData.append('photo', files[0])
    fetch('/uploadPhoto', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.err) {
          alert(json.err)
        } else {
          dispatch(addAttachmentUrlToCard(json.url, cardId, listId))
        }
      })
  }
}
