import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Link, browserHistory } from 'react-router';

import { Header } from '../../app/components/Header.jsx';

describe('Header Component', () => {
  let component;
  const props = {
    logoutUser: sinon.spy(),
    user: { id: 32 },
  };
  beforeEach(() => {
    component = shallow(<Header {...props}/>);
  });
  afterEach(() => {
    props.logoutUser.reset();
  });

  it('should find the neccessary dom elements ', () => {
    expect(component.find('.nav-drop-div').length).to.equal(1);
    expect(component.find(Link).length).to.equal(2);
  });
  it('simulates click event, logoutUser', () => {
    sinon.stub(browserHistory, 'push', () => null);
    component.find('#logoutLink').first().simulate('click');
    expect(props.logoutUser).to.have.property('callCount', 1);
  });
});
