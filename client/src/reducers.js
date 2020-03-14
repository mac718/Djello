import * as Actions from './actions'

const initialState = {
  username: '',
  password: '',
  isLoggingIn: false,
  currentUser: {},
  currentBoard: {},
  userBoards: [],
  error: '',
  redirect: '',
  showCardForm: false,
  title: '',
  activeCardModal: null,
}

export function djello(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_DATA_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      }
    case Actions.GET_DATA_SUCCESS:
      console.log('reducer ' + JSON.stringify(action.data.user.activeBoard))
      return {
        ...state,
        isLoggingIn: false,
        currentUser: action.data.user,
        redirect: action.data.redirect,
        userBoards: action.data.boards,
        currentBoard: action.data.user.activeBoard,
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
    case Actions.SET_CURRENT_BOARD:
      console.log(action.data)
      return {
        ...state,
        currentBoard: action.data,
      }
    case Actions.UPDATE_CURRENT_USER:
      console.log('current user ' + action.data)
      return {
        ...state,
        currentUser: action.data,
      }
    case Actions.CREATE_CARD_FORM:
      return {
        ...state,
        showCardForm: true,
      }
    case Actions.HIDE_CARD_FORM:
      return {
        ...state,
        showCardForm: false,
      }
    case Actions.CHANGE_TITLE:
      return {
        ...state,
        title: action.title,
      }
    case Actions.CHANGE_ACTIVE_CARD_MODAL:
      return {
        ...state,
        activeCardModal: state.activeCardModal ? null : action.id,
      }
    default:
      return state
  }
}
