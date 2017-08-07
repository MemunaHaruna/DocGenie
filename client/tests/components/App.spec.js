import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Header from '../../app/components/Header.jsx';
import App from '../../app/components/App.jsx';


describe('App Component', () => {
  let component;
  const mockStore = configureStore([thunk]);
  const store = mockStore({ documents: {},
    user: { currentProfile: { id: 10 } } });

  beforeEach(() => {
    component = shallow(<App> we are App's children' </App>, {
      context: { store },
      childContextTypes: {
        store: React.PropTypes.object
      }
    });
  });

  it('should find the neccessary dom elements ', () => {
    expect(component.find(Header).length).to.equal(1);
    expect(component.find('.app-container').length).to.equal(1);
  });
});
