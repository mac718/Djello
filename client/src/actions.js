import { get } from 'mongoose'

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
export const EDIT_CARD_ATTRIBUTE = 'EDIT_CARD_ATTRIBUTE'
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

export function createCardForm() {
  return {
    type: CREATE_CARD_FORM,
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

export function editCardAttribute(attribute) {
  return {
    type: EDIT_CARD_ATTRIBUTE,
    attribute,
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

//handles register and login
export function handleSubmit(e, route) {
  return (dispatch, getState) => {
    e.preventDefault()
    let state = getState()
    let username = state.username
    let password = state.password
    console.log(JSON.stringify({ username: username, password: password }))

    fetch(route, {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('Yay!')
          return res.json()
          //this.props.history.push('/')
        } else {
          console.log('no')
          const error = new Error(res.error)
          throw error
        }
      })
      .then(json => {
        console.log('submit ' + JSON.stringify(json))
        dispatch(getDataSuccess(json))
      })
      .catch(err => {
        console.log(err)
        dispatch(getDataFailure(err))
        alert('Error logging in')
      })
  }
}

export function handleLogOut(e) {
  return dispatch => {
    fetch('/logout', {
      method: 'POST',
    })
      .then(() => dispatch(redirectAfterLogout()))
      .catch(err => {
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
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(json => {
        dispatch(updateActiveBoardLists(json.lists))
        dispatch(updateCurrentUser(json.user))
      })
      .catch(err => {
        alert(err)
      })
  }
}

export function createList(e) {
  return (dispatch, getState) => {
    let state = getState()
    console.log('state ' + JSON.stringify(state))

    fetch('/createList', {
      method: 'POST',
      body: JSON.stringify({ activeBoard: state.currentUser.activeBoard }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => {
        console.log('json ' + JSON.stringify(res))
        return res.json()
      })
      .then(json => {
        console.log('json ' + JSON.stringify(json))
        //console.log('create list ' + JSON.stringify(json))
        dispatch(updateActiveBoardLists(json.lists))
        dispatch(updateCurrentUser(json.user))
      })
      .catch(err => {
        console.log(err)
        dispatch(getDataFailure(err))
        alert('hmmmm')
      })
  }
}

export function deleteList(e) {
  return dispatch => {
    let listId = e.target.parentElement.id
    fetch('/deleteList', {
      method: 'DELETE',
      body: JSON.stringify({ listId }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => {
        console.log(JSON.stringify(res))
        return res.json()
      })
      .then(json => {
        console.log(json)
        dispatch(updateActiveBoardLists(json.lists))
        dispatch(updateCurrentUser(json.user))
      })
      .catch(err => {
        console.log(err)
        dispatch(getDataFailure(err))
        alert('hmmmm')
      })
  }
}

export function deleteBoard(e) {
  return (dispatch, getState) => {
    console.log('butts')
    let state = getState()
    let id = state.currentUser.activeBoard
    fetch('/deleteBoard', {
      method: 'DELETE',
      body: JSON.stringify({ board: id }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        console.log('current User ' + JSON.stringify(json))
        dispatch(updateCurrentUser(json))
      })
      .catch(err => {
        console.log(err)
        dispatch(getDataFailure(err))
        alert('hmmmm')
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
      e.target.value = ''
    }
    let state = getState()
    let currentUser = state.currentUser
    console.log('route ' + route)
    fetch(route, {
      method: 'POST',
      body: JSON.stringify({ componentName, currentUser, listId }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        console.log('change name ' + JSON.stringify(json))
        if (route === '/changeListName') {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        } else {
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch(err => {
        console.log(err)
        alert('hmmmm')
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
    console.log('list yo ' + listId)
    let title = state.title
    fetch('/createCard', {
      method: 'POST',
      body: JSON.stringify({ listId, currentUser, title }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        dispatch(updateActiveBoardLists(json.lists))
        dispatch(updateCurrentUser(json.user))
      })
      .catch(err => {
        console.log(err)
        alert('hmmmm')
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
      .then(res => {
        return res.json()
      })
      .then(json => {
        dispatch(updateActiveBoardLists(json.lists))
        dispatch(updateCurrentUser(json.user))
      })
      .catch(err => {
        console.log(err)
        alert('hmmmm')
      })
  }
}

export function switchActiveBoard(e) {
  return (dispatch, getState) => {
    let state = getState()
    let currentUser = state.currentUser
    let boardId = e.target.id
    console.log('boardId ' + boardId)
    fetch('switchActiveBoard', {
      method: 'PATCH',
      body: JSON.stringify({ boardId, currentUser }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        dispatch(updateActiveBoardLists(json.lists))
        dispatch(updateCurrentUser(json.user))
      })
      .catch(err => {
        console.log(err)
        alert('hmmmm')
      })
  }
}

export function updateCardAttribute(e) {
  return (dispatch, getState) => {
    dispatch(toggleIsLoading())
    let state = getState()
    let attributeType = state.attributeType
    let attributeContent = state.cardAttributeContent
    let currentUser = state.currentUser
    let listId
    let cardId

    if (attributeType === 'title') {
      dispatch(switchToCardTItleDisplay())
      cardId =
        e.target.parentElement.parentElement.parentElement.parentElement.id
      listId =
        e.target.parentElement.parentElement.parentElement.parentElement
          .firstChild.id
    } else if (attributeType === 'description') {
      dispatch(switchToCardDescriptionDisplay())
      cardId = e.target.parentElement.parentElement.parentElement.id
      listId = e.target.parentElement.parentElement.parentElement.firstChild.id
    } else if (attributeType === 'member') {
      cardId =
        e.target.parentElement.parentElement.parentElement.parentElement.id
      listId =
        e.target.parentElement.parentElement.parentElement.parentElement
          .firstChild.id
    }

    console.log('hello')

    fetch('/updateCardAttribute', {
      method: 'POST',
      body: JSON.stringify({
        attributeType,
        attributeContent,
        currentUser,
        listId,
        cardId,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => {
        console.log('res ' + JSON.stringify(res))
        if (res.status === 500) {
          return res
        } else {
          return res.json()
        }
      })
      .then(json => {
        if (json.status === 500) {
          dispatch(displayDuplicateMemberWarning())
        } else if (attributeType === 'member') {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
          dispatch(addBoardToMember())
        } else {
          dispatch(updateActiveBoardLists(json.lists))
          dispatch(updateCurrentUser(json.user))
        }
      })
      .catch(err => {
        console.log(err)
        alert('hmmmm')
      })
  }
}

export function getAllUsers() {
  return dispatch => {
    fetch('/getAllUsers')
      .then(res => {
        return res.json()
      })
      .then(json => {
        dispatch(updateUserList(json))
      })
      .catch(err => {
        console.log(err)
        alert('hmmmm')
      })
  }
}

export function addBoardToMember() {
  return (dispatch, getState) => {
    let state = getState()
    console.log('state' + JSON.stringify(state))
    let username = state.cardAttributeContent
    let boardId = state.currentUser.activeBoard
    fetch('/addBoardToMember', {
      method: 'POST',
      body: JSON.stringify({ username, boardId }),
      headers: {
        'Content-type': 'application/json',
      },
    }).catch(err => {
      console.log(err)
      alert('hmmmm')
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

    console.log('username ' + username)

    fetch('/deleteMemberFromCard', {
      method: 'DELETE',
      body: JSON.stringify({ username, cardId, listId, currentUser }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        dispatch(updateActiveBoardLists(json.lists))
        dispatch(updateCurrentUser(json.user))
      })
      .catch(err => {
        console.log(err)
        alert('hmmmm')
      })
  }
}

export function changeActiveBoardLists(source, destination, draggableId) {
  return (dispatch, getState) => {
    let state = getState()
    let lists = state.activeBoardLists
    let sourceList = lists.filter(list => {
      return JSON.stringify(source.droppableId) === JSON.stringify(list._id)
    })[0]
    let destinationList = lists.filter(list => {
      return (
        JSON.stringify(destination.droppableId) === JSON.stringify(list._id)
      )
    })[0]
    let draggedCard = sourceList.cards.filter(card => {
      return JSON.stringify(card._id) === JSON.stringify(draggableId)
    })[0]

    sourceList.cards.splice(source.index, 1)
    destinationList.cards.splice(destination.index, 0, draggedCard)
    console.log('sourceList ' + JSON.stringify(sourceList))
    console.log('destination ' + JSON.stringify(destinationList))

    let sourceListIndex
    let destinationListIndex
    lists.forEach((list, index) => {
      if (JSON.stringify(list._id) === JSON.stringify(sourceList._id)) {
        sourceListIndex = index
      }
    })
    lists.forEach((list, index) => {
      if (JSON.stringify(list._id) === JSON.stringify(destinationList._id)) {
        destinationListIndex = index
      }
    })

    lists.splice(sourceListIndex, 1, sourceList)
    lists.splice(destinationListIndex, 1, destinationList)
    //needs conditional logic to handle movement within same list vs between two lists
    dispatch(updateActiveBoardLists(lists))
  }
}

export function onDragEnd(result) {
  return (dispatch, getState) => {
    let state = getState()
    let currentUser = state.currentUser

    const { destination, source, draggableId } = result

    console.log(draggableId)
    console.log('source ' + JSON.stringify(source))
    console.log('destination ' + JSON.stringify(destination))

    if (!destination) {
      console.log("it's working")
      return
    }

    if (
      destination.draoppableId === source.draoppableId &&
      destination.index === source.index
    ) {
      return
    }

    dispatch(changeActiveBoardLists(source, destination, draggableId))

    fetch('/updateListAfterDnD', {
      method: 'POST',
      body: JSON.stringify({ currentUser, destination, source, draggableId }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        //dispatch(updateCurrentUser(json))
      })
      .catch(err => {
        console.log(err)
        alert('hmmmm')
      })
  }
}

//change lists along with updateCurrentUser (pass updates lists to action); create serparate action for card order changes
