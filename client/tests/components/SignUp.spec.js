import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { SignUp } from '../../app/components/SignUp.jsx';

describe('SignUp Component', () => {
  let component;
  const props = {
    createUser: sinon.spy(),
    changeScreen: sinon.spy(),
    user: { id: 6 },
    error: ''
  };
  beforeEach(() => {
    component = mount(<SignUp {...props}/>);
  });
  afterEach(() => {
    props.createUser.reset();
    props.changeScreen.reset();
  });

  it('should have all the set props', () => {
    expect(component.props().user.id).to.equal(6);
  });
  it('should find the neccessary dom elements ', () => {
    expect(component.find('.container').length).to.equal(1);
    expect(component.find('input').length).to.equal(5);
  });
  it('simulates click events', () => {
    component.find('form').simulate('submit',
      { target: { fullname: { value: 'test user' },
        email: { value: 'test@yahoo.com' },
        username: { value: 'test12' },
        password: { value: 'testing' },
        confirmPassword: { value: 'test@yahoo.com' } } });
    expect(props.createUser).to.have.property('callCount', 1);
  });
});
