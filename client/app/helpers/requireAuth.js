import { getUser } from '../actions/userActions';

/**
 * @description - validates the routes, checks if the user is authorized
 * then fetches user details from server via getUser action
 * @param {object} store - redux store
 * @returns {function} callback - react-router callback function which
 * blocks route transitioning until it is invoked.
 */
const requireAuth = (store) => {
  return (nextState, replace, callback) => {
    const token = localStorage.getItem('token');
    const { user: { currentProfile: { id } = {} } = {} } = store.getState();
    if (token && id && !nextState.location.pathname.includes('dashboard')) {
      replace('/dashboard');
      return callback();
    }
    if (token && !id) {
      return store.dispatch(getUser()).then(() => {
        if (!nextState.location.pathname.includes('dashboard')) {
          replace('/dashboard');
        }
        return callback();
      }, (error) => {
        if (error.message === 'UserInvalidToken') {
          localStorage.removeItem('token');
        }
        replace('/');
        return callback();
      }).catch((error) => {
        if (error.message === 'UserInvalidToken') {
          localStorage.removeItem('token');
        }
        replace('/');
        return callback();
      });
    }
    if (!token && nextState.location.pathname.includes('dashboard')) {
      replace('/');
      return callback();
    }
    return callback();
  };
};

export default requireAuth;
