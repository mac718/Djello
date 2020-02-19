export const GET_DATA_REQUEST = 'GET_DATA_REQUEST'
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'
export const GET_DATA_FAILURE = 'GET_DATA_FAILURE'

export const HANDLE_USERNAME_INPUT_CHANGE = 'HANDLE_USERNAME_INPUT_CHANGE'
export const HANDLE_PASSWORD_INPUT_CHANGE = 'HANDLE_PASSWORD_INPUT_CHANGE'
export const SET_CURRENT_BOARD = 'SET_CURRENT_BOARD'

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
  return dispatch => {
    fetch('/createBoard', {
      method: 'POST',
    })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(json => {
        dispatch(setCurrentBoard(json))
      })
  }
}

export function createList(e) {
  return () => {
    fetch('/createList', {
      method: 'POST',
    }).then(res => {
      console.log(res)
      return res.json()
    })
  }
}
