import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { updateProfile } from '../../actions/userActions';

/**
 * @description - displays individual user information in a table rowS
 * @param {object} props
 */
export class UserRow extends React.Component {
  constructor(props) {
    super(props);
    this.roleObject = { admin: 1, user: 2 };
    this.state = {
      isEdit: false,
      role: ''
    };

    this.toggleIsEdit = this.toggleIsEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderRoleOption = this.renderRoleOption.bind(this);
  }

  /**
   * @description - React lifecyle method which is invoked before the
   * component mounts
   * @memberOf UserRow
   */
  componentWillMount() {
    const { user: { roleId } } = this.props;
    const roleObject = { 1: 'admin', 2: 'user' };
    this.setState({ role: roleObject[roleId] });
  }

  /**
   * @description - React lifecyle method which is invoked once the
   * component receives next props
   * @memberOf UserRow
   */
  componentWillReceiveProps(nextProps) {
    const { user: { roleId } } = nextProps;
    const roleObject = { 1: 'admin', 2: 'user' };
    this.setState({ role: roleObject[roleId] });
  }

  /**
   * @description - toggles between edit state and default display state
   * @param {null}
   * @return {void}
   * @memberOf AllUsers
   */
  toggleIsEdit() {
    this.setState({ isEdit: !this.state.isEdit });
  }

  /**
  * @description - handles form submit
  * @param {event} event - triggered event
  * @return {void}
  * @memberOf UserRow
  */
  handleSubmit(event) {
    event.preventDefault();
    const roleId = event.target.role.value;
    this.props.updateProfile({ roleId }, this.props.user.id).then(() => {
      toastr.success('User Role Updated!');
      this.toggleIsEdit();
    }).catch(() => {
      toastr.error('Could not update profile');
    });
  }

  /**
  * @description - renders the edit user role form
  * @param {null}
  * @return {void}
  * @memberOf UserRow
  */
  renderRoleOption() {
    if (this.state.isEdit) {
      return (<form onSubmit={this.handleSubmit}>
        <select name="role" className="browser-default"
          value={this.roleObject[this.state.role]} onChange={(e) => {
            this.setState({ role: e.target.value });
          }}>
          <option value="" disabled selected>Select user role</option>
          <option value="1">admin</option>
          <option value="2">user</option>
        </select>
        <button type="submit">Update</button>
      </form>);
    }
    return this.state.role;
  }

  /**
  * @description - React lifecyle method returns a DOM element
  * @returns {void}
  * @param {null}
  * @memberOf AllUsers
  */
  render() {
    const { index, user } = this.props;
    return (
      <tr>
        <td id="index">{index + 1}</td>
        <td id="fullname">{user.fullname}</td>
        <td id="username">{user.username}</td>
        <td id="email">{user.email}</td>
        <td>{this.renderRoleOption()}</td>
        <td>
          <button
            className="btn update-role create-doc tooltipped"
            title="UPDATE ROLE" onClick={this.toggleIsEdit}>
            <i className="large material-icons">mode_edit</i>
          </button>
        </td>
      </tr>
    );
  }
}

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (user, id) => dispatch(updateProfile(user, id))
  };
};

UserRow.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  role: PropTypes.number.isRequired
};

export default connect(null, mapDispatchToProps)(UserRow);
