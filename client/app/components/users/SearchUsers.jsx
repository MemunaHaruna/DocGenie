import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchForUsers, viewAllUsers } from '../../actions/userActions';
import InputField from '../InputField.jsx';
/**
 * @description - displays all users for admin users
 * @param {object} props
 * @returns {void}
 */
export const SearchUsers = (props) => {
/**
 * @description - triggers searchForUsers action
 * @param {object} event - triggered event
 * @returns {void}
 * @memberOf SearchUsers
 */
  const handleChange = (event) => {
    event.preventDefault();
    const searchKey = event.target.value;
    const { limit, offset } = props;
    if (searchKey) {
      props.searchForUsers({ searchKey, limit });
    } else {
      props.viewAllUsers({ limit, offset });
    }
  };
  return (
    <div id="search-users" className="row search-docs">
      <InputField type="text" name="searchKey" id="searchKey"
        className="validate" placeholder="Search for a user here..."
        onChange={handleChange} divClass="col s12" />
    </div>
  );
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    searchForUsers: searchData => dispatch(searchForUsers(searchData)),
    viewAllUsers: paginationMetadata =>
      dispatch(viewAllUsers(paginationMetadata)),
  };
};

SearchUsers.propTypes = {
  searchForUsers: PropTypes.func.isRequired,
  viewAllUsers: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(SearchUsers);
