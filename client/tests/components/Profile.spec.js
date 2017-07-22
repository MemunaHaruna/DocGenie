import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { Profile } from '../../app/components/Profile.jsx';

describe('Profile Component', () => {
  let component;
  const props = {
    currentDocument: [],
    user: { id: 7 },
    error: '',
    updateProfile: sinon.spy()
  };
  beforeEach(() => {
    component = mount(<Profile {...props}/>);
  });
  afterEach(() => {
    props.updateProfile.reset();
  });

  it('should have all the set props', () => {
    expect(component.props().user.id).to.equal(7);
  });
  it('should find the neccessary dom elements ', () => {
    component.setState({ isEdit: true, isChecked: true });
    expect(component.find('.switch').length).to.equal(1);
    expect(component.find('input').length).to.equal(7);
  });
  xit('simulates click events', () => {
    component.setState({ isEdit: true, isChecked: true });
    component.find('form').simulate('submit', { target: { fullname: { value: 'test test' },
      username: { value: 'test12' },
      email: { value: 'test@yahoo.com' },
      oldPassword: { value: 'testing' },
      password: { value: 'testing12' },
      confirmPassword: { value: 'testing12' } } });
    expect(props.updateProfile).to.have.property('callCount', 1);
  });
});
