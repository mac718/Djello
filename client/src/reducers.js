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
  cardAttributeContent: '',
  showBoardNameDisplay: true,
  showCardDescriptionForm: false,
  showCardTitleForm: false,
  attributeType: '',
  isLoading: false,
  userList: [],
  showDuplicateMemberWarning: false,
  activeBoardLists: [],
  currentList: {},
  currentCard: {},
  progressValue: 0,
  showChecklistItemForm: false,
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
        activeBoardLists: action.data.lists,
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
        isLoading: false,
      }
    case Actions.CREATE_CARD_FORM:
      return {
        ...state,
        showCardForm: action.listId,
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
    case Actions.EDIT_CARD_ATTRIBUTE:
      console.log('decription ' + action.attribute)
      return {
        ...state,
        cardAttributeContent: action.attribute,
      }
    case Actions.CHANGE_SHOW_BOARD_NAME_DISPLAY:
      return {
        ...state,
        showBoardNameDisplay: state.showBoardNameDisplay ? false : true,
      }
    case Actions.SWITCH_TO_CARD_DESCRIPTION_FORM:
      return {
        ...state,
        showCardDescriptionForm: true,
        attributeType: 'description',
      }
    case Actions.SWITCH_TO_CARD_DESCRIPTION_DISPLAY:
      return {
        ...state,
        showCardDescriptionForm: false,
      }
    case Actions.SWITCH_TO_CARD_TITLE_FORM:
      return {
        ...state,
        showCardTitleForm: true,
        attributeType: 'title',
      }
    case Actions.SWITCH_TO_CARD_TITLE_DISPLAY:
      return {
        ...state,
        showCardTitleForm: false,
      }
    case Actions.TOGGLE_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case Actions.REDIRECT_AFTER_LOGOUT:
      return {
        ...state,
        redirect: '/login',
      }
    case Actions.UPDATE_USER_LIST:
      return {
        ...state,
        userList: action.users,
      }
    case Actions.SELECT_MEMBER_FROM_DROPDOWN:
      return {
        ...state,
        attributeType: 'member',
        cardAttributeContent: action.member,
      }
    case Actions.DISPLAY_DUPLICATE_MEMBER_WARNING:
      return {
        ...state,
        showDuplicateMemberWarning: true,
      }
    case Actions.CLOSE_DUPLICATE_MEMBER_WARNING:
      return {
        ...state,
        showDuplicateMemberWarning: false,
      }
    case Actions.UPDATE_ACTIVE_BOARD_LISTS:
      console.log('lists ' + JSON.stringify(action.lists))
      return {
        ...state,
        activeBoardLists: action.lists,
      }
    case Actions.SET_CURRENT_LIST_AND_CARD:
      return {
        ...state,
        currentList: action.listAndCard.currentList,
        currentCard: action.listAndCard.currentCard,
      }
    case Actions.SHOW_ADD_ITEM_FORM:
      return {
        ...state,
        showChecklistItemForm: action.cardId,
      }
    case Actions.HIDE_ADD_ITEM_FORM:
      return {
        ...state,
        showChecklistItemForm: false,
      }
    default:
      return state
  }
}
