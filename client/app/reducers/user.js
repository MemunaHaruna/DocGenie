import { CREATE_USER, SIGNIN_USER, CREATE_USER_ERROR, SIGNIN_USER_ERROR,
  LOGOUT_USER, VIEW_USERS, VIEW_USERS_ERROR, SEARCH_USERS,
  SEARCH_USERS_ERROR, UPDATE_USER, UPDATE_USER_ERROR } from '../actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
  case CREATE_USER:
  case SIGNIN_USER:
    return { ...state, currentProfile: action.user, error: '' };
  case LOGOUT_USER:
    return { ...state, currentProfile: {}, error: '' };
  case UPDATE_USER: {
    const { users = [] } = state;
    const filteredUsers = users.filter(user => action.user.id !== user.id);
    return { ...state,
      users: ([...filteredUsers, action.user]).sort((a, b) =>
        b.id - a.id),
      error: '' };
  }

  case VIEW_USERS:
  case SEARCH_USERS: {
    const { currentProfile = {} } = state;
    const filteredUsers =
    action.users.filter(user => user.id !== currentProfile.id);
    return { ...state, users: filteredUsers, ...action.pagination, error: '' };
  }
  case CREATE_USER_ERROR:
  case SIGNIN_USER_ERROR:
  case VIEW_USERS_ERROR:
  case SEARCH_USERS_ERROR:
  case UPDATE_USER_ERROR:
    return { ...state, error: action.errorMessage };
  default:
    return state;
  }
};
