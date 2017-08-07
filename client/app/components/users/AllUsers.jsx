import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import SearchUsers from './SearchUsers.jsx';
import UserRow from './UserRow.jsx';
import { viewAllUsers } from '../../actions/userActions';

/**
 * @description - This component renders all registered users for an admin user
 * @export
 * @class AllUsers
 * @extends {React.Component}
 */
export class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      limit: 6,
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
   * @description - React lifecyle method which is invoked once the
   * component mounts
   * @memberOf AllUsers
   */
  componentDidMount() {
    const { limit, offset } = this.state;
    this.props.viewAllUsers({ limit, offset });
  }

  /**
  * @description - Allows user navigate pages by changing limit and offset
  * @param {object} page - ReactPaginate page object
  * @return {void}
  */
  handlePageChange(page) {
    const { limit } = this.state;
    const selected = page.selected;
    const offset = Math.ceil(selected * this.state.limit);
    this.setState({ offset }, () => {
      this.props.viewAllUsers({ limit, offset });
    });
  }

  /**
   * @description - React lifecycle method invoked on component mount
   * @returns a DOM element
   * @memberOf AllUsers
   */
  render() {
    return (
      <div id="all-users" className="container">
        <h4 className="center-align">ALL USERS</h4>
        <SearchUsers limit={this.state.limit} offset={this.state.offset}/>
        <div className="col s12 all-users">
          <table className="responsive-table striped centered
         all-users">
            <thead>
              <tr>
                <th>No.</th>
                <th>Fullname</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.map(({ ...rest, role }, i) => (
                <UserRow user={rest} role={role} key={rest.fullname} index={i}
                  limit={this.state.limit} offset={this.state.offset} />
              )
              )}
            </tbody>
          </table>
        </div>
        {this.props.users && this.props.users.length === 0 &&
          <div className="center-align">
            <h5>Aww shucks...No users found
            </h5>
          </div>
        }
        {/* pagination */}
        {this.props.users && this.props.users.length === 0 ? '' :
          (<div className="center-align">
            <ReactPaginate
              previousLabel={<i className="material-icons">chevron_left</i>}
              nextLabel={<i className="material-icons">chevron_right</i>}
              breakLabel={<a href="">...</a>}
              breakClassName={'break-me'}
              pageCount={this.props.pages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageChange}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active page-list'} />
          </div>
          )}
      </div>
    );
  }
}

// Maps state from store to props
const mapStateToProps =
  ({ user: { users, pages, currentProfile, currentPage } }) => {
    return {
      user: currentProfile || {},
      users: users || [],
      pages,
      currentPage,
    };
  };

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    viewAllUsers: paginationMetadata =>
      dispatch(viewAllUsers(paginationMetadata)),
  };
};

AllUsers.propTypes = {
  viewAllUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
