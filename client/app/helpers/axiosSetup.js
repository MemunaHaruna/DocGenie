import axios from 'axios';

/**
 * @description - this function sets axios header
 * @param {string} token - user token stored in local storage
 * @return {void}
 */
const setAxiosHeader = (token) => {
  if (token) {
    axios.defaults.headers.common.authorization = token;
  } else {
    delete axios.defaults.headers.common.authorizaton;
  }
};
window.axios = axios;
export default setAxiosHeader;
