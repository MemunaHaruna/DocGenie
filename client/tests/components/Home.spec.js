import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SignUp } from '../../app/components/SignUp.jsx';
import { SignIn } from '../../app/components/SignIn.jsx';
import Home from '../../app/components/Home.jsx';


describe('Home component', () => {
  let component;
  const mockStore = configureStore([thunk]);
  const store = mockStore({ documents: {},
    user: { currentProfile: { id: 10 } } });

  beforeEach(() => {
    component = mount(<Home />, {
      context: { store },
      childContextTypes: {
        store: React.PropTypes.object
      }
    });
  });

  it('should have the required states', () => {
    expect(component.state().isSignInScreen).to.equal(true);
  });
  it('should find the neccessary dom elements ', () => {
    expect(component.find('h2').length).to.equal(1);
    expect(component.find('.index-page').length).to.equal(1);
  });
  it('should render SignIn component if isSignInScreen is set to true', () => {
    expect(component.find(SignIn).length).to.equal(1);
    expect(component.find(SignUp).length).to.equal(0);
  });
  it('should render SignUp component if isSignInScreen is set to false', () => {
    component.setState({ isSignInScreen: false });
    expect(component.find(SignUp).length).to.equal(1);
    expect(component.find(SignIn).length).to.equal(0);
  });
});
