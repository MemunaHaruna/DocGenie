import { expect } from 'chai';
import { browserHistory } from 'react-router';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import sinon from 'sinon';
import { CREATE_USER, SIGNIN_USER,
  LOGOUT_USER, VIEW_USERS, UPDATE_USER } from '../../app/actionTypes';

import { createUser,
  signInUser, getUser, logoutUser,
  updateProfile, viewAllUsers } from '../../app/actions/userActions';

const mockStore = configureMockStore([thunk]);

describe('User Actions', () => {
  let store;
  let axiosGetStub;
  let axiosPostStub;
  let axiosPutStub;
  let axiosDeleteStub;
  let browserHistorySpy;
  const response = { data: {
    user: { fullname: 'one user' },
    users: [{ id: 1, userId: 34, fullname: 'two users' }],
    pagination: 'pagination object',
    token: 'dsnvhsdbvjvvhbcx',
  } };
  const error = {
    response: {
      data: 'an error'
    }
  };
  beforeEach(() => {
    store = mockStore({ user: {} });
    browserHistorySpy = sinon.stub(browserHistory, 'push', () => null);
    axiosGetStub = sinon.stub(axios, 'get', (url) => {
      return url.indexOf('api') > -1 ? Promise.resolve(response) :
        Promise.reject(error);
    });
    axiosPostStub = sinon.stub(axios, 'post', (url) => {
      return url.indexOf('api') > -1 ? Promise.resolve(response) :
        Promise.reject(error);
    });
    axiosPutStub = sinon.stub(axios, 'put', (url) => {
      return url.indexOf('api') > -1 ? Promise.resolve(response) :
        Promise.reject(error);
    });
    axiosDeleteStub = sinon.stub(axios, 'delete', (url) => {
      return url.indexOf('api') > -1 ? Promise.resolve(response) :
        Promise.reject(error);
    });
  });
  afterEach(() => {
    axiosGetStub.restore();
    axiosPostStub.restore();
    axiosPutStub.restore();
    axiosDeleteStub.restore();
    browserHistorySpy.restore();
  });
  it('should dispatch appropriate actions on createUser', () => {
    const user = { id: 23, roleId: 2, username: 'tada' };
    return store.dispatch(createUser(user)).then(() => {
      expect(store.getActions())
        .to.deep.equal([{ type: CREATE_USER, user: response.data.user }]);
    });
  });
  it('should dispatch appropriate actions on signInUser', () => {
    const user = { id: 23, roleId: 2, username: 'tada' };
    return store.dispatch(signInUser(user)).then(() => {
      expect(store.getActions())
        .to.deep.equal([{ type: SIGNIN_USER, user: response.data.user }]);
    });
  });
  it('should dispatch appropriate actions on logoutUser', () => {
    expect(logoutUser()).to.deep.equal({ type: LOGOUT_USER });
  });
  it('should dispatch appropriate actions on getUser', () => {
    return store.dispatch(getUser()).then(() => {
      expect(store.getActions())
        .to.deep.equal([{ type: CREATE_USER, user: response.data }]);
    });
  });
  it('should dispatch appropriate actions on updateProfile', () => {
    const user = { id: 23, roleId: 2, username: 'tada' };
    return store.dispatch(updateProfile(user)).then(() => {
      expect(store.getActions())
        .to.deep.equal([{ type: UPDATE_USER, user: response.data }]);
    });
  });
  it('should dispatch appropriate actions on viewAllUsers', () => {
    const page = '2';
    return store.dispatch(viewAllUsers(page)).then(() => {
      expect(store.getActions()).to.deep.equal([{ type: VIEW_USERS,
        users: response.data.users,
        pagination: response.data.pagination }]);
    });
  });
});
