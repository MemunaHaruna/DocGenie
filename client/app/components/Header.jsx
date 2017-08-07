import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { Navbar, Dropdown, NavItem, Icon } from 'react-materialize';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/userActions';

/**
* @description - Navigates to /dashboard route and displays all documents
* @returns {void}
*/
const displayAllDocuments = () => {
  browserHistory.push('/dashboard');
};

/**
* @description - navigates to /dashboard/mydocuments route and displays a user's
* personal documents.
* @returns {void}
*/
const displayOwnDocuments = () => {
  browserHistory.push('/dashboard/mydocuments');
};

/**
* @description - renders the navigation bar at the top of the page
* @param {object} props - user details received from parent component
* @returns {void}
*/
export const Header = (props) => {
  const { user } = props;
  return (
    <Navbar id="nav" brand="DocGenie" className="nav-logo" right>
      {user.id && <NavItem onClick={displayAllDocuments}
        className="navbar-item">All Documents</NavItem>}
      {user.id && <NavItem onClick={displayOwnDocuments}
        className="navbar-item">My Documents</NavItem>}
      {user.id && <NavItem className="chip chip-style">
        Welcome, @{user.username}</NavItem>}
      {user.id && <Dropdown id="dropdown-options"
        className="col s4 nav-dropdown-content"
        trigger={
          <NavItem id="more_vert" href="#!">
            <Icon>more_vert</Icon>
          </NavItem>
        }
      >
        <div className="nav-drop-div">
          <ul className="nav-dropdown-list">
            <Link to="/dashboard/profile" style={{ color: '#000' }}>
                Profile
            </Link>
          </ul>
          {(user.roleId === 1) && <ul className="nav-dropdown-list">
            <Link id="manage-users" to="/dashboard/users"
              style={{ color: '#000' }}>
              Manage Users
            </Link>
          </ul>}
          <ul>
            <Link className="logout" id="logoutLink" to="#" onClick={() => {
              props.logoutUser();
              localStorage.removeItem('token');
              browserHistory.push('/');
            }}>LOGOUT
            </Link>
          </ul>
        </div>
      </Dropdown>}
    </Navbar>
  );
};


// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    user: state.user.currentProfile || {}
  };
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
};

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
