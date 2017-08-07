import React from 'react';
import SignUp from './SignUp.jsx';
import SignIn from './SignIn.jsx';

/**
 * @description - renders welcome screen, SignUp and SignIn screens
 * @class Home
 * @extends {React.Component}
 */
class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      isSignInScreen: true,
    };
    this.changeScreen = this.changeScreen.bind(this);
  }

  /**
   * @description - changeScreen method toggles between SignIn and SignUp forms
   * @param {null}
   * @memberOf Home
   */
  changeScreen() {
    this.setState({ isSignInScreen: !this.state.isSignInScreen });
  }

  /**
   * @description - conditionally renders SignIn or SignUp forms
   * component
   * @returns a DOM element
   * @memberOf Home
   */
  renderSigninOrSignUp() {
    if (this.state.isSignInScreen) {
      return (<SignIn changeScreen={this.changeScreen}
        isSignInScreen={this.state.isSignInScreen} />);
    }
    return (<SignUp isSignInScreen={this.state.isSignInScreen}
      changeScreen={this.changeScreen} />);
  }

  /**
   * @description - render method, React lifecycle method
   * @returns a DOM element
   * @memberOf Home
   */
  render() {
    return (
      <div className="index-page container">
        <div className="row">
          <div className="col s6 homeText center-align">
            <h2>Welcome to DocGenie</h2>
            <p className="welcome-text">
              <b>Docgenie allows you to manage your documents, easily!</b>
            </p>
            <div className="row">
              <div className="col s4 welcome-text">
                <i>Create Documents</i>
              </div>
              <div className="col s4 welcome-text">
                <i>Edit your documents</i>
              </div>
              <div className="col s4 welcome-text">
                <i>Share with friends</i>
              </div>
            </div>
          </div>
          <div className="col s5 center-align signInOrSignUp">
            {this.renderSigninOrSignUp()}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
