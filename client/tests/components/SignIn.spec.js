import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { SignIn } from '../../app/components/SignIn.jsx';

describe('SignIn Component', () => {
  let component;
  const props = {
    signInUser: sinon.spy(),
    changeScreen: sinon.spy(),
    user: { id: 5 },
    error: ''
  };
  beforeEach(() => {
    component = mount(<SignIn {...props}/>);
  });
  afterEach(() => {
    props.signInUser.reset();
    props.changeScreen.reset();
  });

  it('should have all the set props', () => {
    expect(component.props().user.id).to.equal(5);
  });
  it('should find the neccessary dom elements ', () => {
    expect(component.find('.container').length).to.equal(1);
    expect(component.find('input').length).to.equal(2);
  });
  it('simulates click events', () => {
    component.find('form').simulate('submit',
      { target: { email: { value: 'test@yahoo.com' },
        password: { value: 'testing' } } });
    expect(props.signInUser).to.have.property('callCount', 1);
  });
});
