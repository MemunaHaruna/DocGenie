import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SearchUsers from '../../app/components/users/SearchUsers.jsx';
import { AllUsers } from '../../app/components/users/AllUsers.jsx';


describe('AllUsers component', () => {
  let component;
  const mockStore = configureStore([thunk]);
  const store = mockStore({ documents: {},
    user: { currentProfile: { id: 10 } } });

  const props = {
    params: {
      page: '3'
    },
    viewAllUsers: sinon.spy(),
    user: { id: 3 },
    users: [],
    currentPage: 1,
    pages: 3,
  };
  beforeEach(() => {
    component = mount(<AllUsers {...props}/>, {
      context: { store },
      childContextTypes: {
        store: React.PropTypes.object
      }
    });
  });
  afterEach(() => {
    props.viewAllUsers.reset();
  });
  it('should mount with necessary props', () => {
    const componentDidMountSpy =
      sinon.spy(AllUsers.prototype, 'componentDidMount');
    mount(<AllUsers {...props}/>, {
      context: { store },
      childContextTypes: {
        store: React.PropTypes.object
      }
    });
    expect(componentDidMountSpy.callCount).to.equal(1);
  });

  it('should have all the set props', () => {
    expect(component.props().user.id).to.equal(3);
    expect(component.props().params.page).to.equal('3');
  });
  it('should find the neccessary dom elements ', () => {
    expect(component.find('table').length).to.equal(1);
    expect(component.find(SearchUsers).length).to.equal(1);
  });
});
