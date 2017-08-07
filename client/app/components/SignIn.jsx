import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signInUser } from '../actions/userActions';
import InputField from './InputField.jsx';

/**
* @description - This component displays the signin form
* @export
* @class SignIn
* @extends {React.Component}
*/
export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
  * @description - this handles signin form submission
  * @param {object} event - event data: email, password
  * @memberOf SignIn
  */
  onSubmit(event) {
    event.preventDefault();
    const { email: { value: email },
      password: { value: password } } = event.target;
    this.props.signInUser({ email, password });
  }

  /**
  * @description - React lifecycle method, renders the react element
  * @returns a DOM element
  * @memberOf SignUp
  */
  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="signup-form"
            onSubmit={this.onSubmit} action="#">
            <div id="error-message" className="error-message">
              {this.props.user.error}
            </div>
            <div className="row">
              <InputField name="email" id="email" type="text"
                className="validate center-align" divClass="input-field col s12"
                placeholder="Email"/>

              <InputField name="password" id="password" type="password"
                className="validate center-align" divClass="input-field col s12"
                placeholder="Password"/>
            </div>
            <div>
              <button type="submit" id="signin-button"
                className="btn btn-large create-doc
                signup-button">SUBMIT</button>
            </div>
            <div>
              <p className="center-align">Don't have an account yet?
                <a id="show-signup" style={{ color: '#EE6352' }}
                  onClick={this.props.changeScreen}> Sign Up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    user: state.user || {}
  };
};

SignIn.propTypes = {
  changeScreen: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  error: PropTypes.string
};

export default connect(mapStateToProps, { signInUser })(SignIn);
