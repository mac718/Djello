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
export const EDIT_CARD_DESCRIPTION = 'EDIT_CARD_DESCRIPTION'
export const CHANGE_SHOW_BOARD_NAME_DISPLAY = 'SHOW_BOARD_NAME_DISPLAY'

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
  return () => {
    fetch('/logout', {
      method: 'POST',
    }).then(res => console.log(res))
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
        dispatch(updateCurrentUser(json))
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
        //console.log('create list ' + JSON.stringify(json))
        dispatch(updateCurrentUser(json))
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
        dispatch(updateCurrentUser(json))
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
        dispatch(updateCurrentUser(json))
      })
      .catch(err => {
        console.log(err)
        //dispatch(getDataFailure(err))
        alert('hmmmm')
      })
  }
}

export function saveCard(e) {
  return (dispatch, getState) => {
    e.preventDefault()
    let state = getState()
    let currentUser = state.currentUser
    let listId = e.target.parentElement.id //.parentElement.parentElement.parentElement.id
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
        dispatch(updateCurrentUser(json))
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
        dispatch(updateCurrentUser(json))
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
        dispatch(updateCurrentUser(json))
      })
      .catch(err => {
        console.log(err)
        alert('hmmmm')
      })
  }
}

export function updateCardDescription() {}
