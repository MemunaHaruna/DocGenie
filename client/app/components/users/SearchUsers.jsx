import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchForUsers } from '../../actions/userActions';

/**
 * @description - displays all users for admin users
 * @param {object} props
 */
export const SearchUsers = (props) => {
/**
 * @description - handleChange function triggers searchForUsers action
 * @returns {void}
 * @memberOf SearchUsers
 */
  const handleChange = (event) => {
    event.preventDefault();
    const searchKey = event.target.value;
    const { limit, offset } = props;
    if (searchKey) props.searchForUsers({ searchKey, limit, offset });
  };
  return (
    <div id="search-users" className="row search-docs">
      <div className="col s12">
        <input name="searchKey" id="searchKey" type="text"
          className="validate" placeholder="Search for a user here..."
          onChange={handleChange}/>
      </div>
    </div>
  );
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    searchForUsers: searchData => dispatch(searchForUsers(searchData)),
  };
};

SearchUsers.propTypes = {
  searchForUsers: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SearchUsers);
