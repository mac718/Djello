import * as Actions from './actions'

const initialState = {
  username: '',
  password: '',
  isLoggingIn: false,
  currentUser: '',
  error: '',
  redirect: '',
}

export function djello(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_DATA_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      }
    case Actions.GET_DATA_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        currentUser: action.data.username,
        redirect: action.data.redirect,
      }
    case Actions.GET_DATA_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        error: action.error,
      }
    case Actions.HANDLE_USERNAME_INPUT_CHANGE:
      return {
        ...state,
        username: action.data,
      }
    case Actions.HANDLE_PASSWORD_INPUT_CHANGE:
      return {
        ...state,
        password: action.data,
      }
    default:
      return state
  }
}
