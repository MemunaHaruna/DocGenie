import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CreateDocument from '../../app/components/documents/CreateDocument.jsx';
import DocumentCard from '../../app/components/documents/DocumentCard.jsx';
import { AllDocuments } from '../../app/components/documents/AllDocuments.jsx';

describe('AllDocuments component', () => {
  const mockStore = configureStore([thunk]);
  let component;
  const store = mockStore({ documents: {},
    user: { currentProfile: { id: 10 } } });

  const props = {
    documents: [{ id: 2,
      title: 'A document',
      content: 'lorem ipsum',
      userId: 3,
      createdAt: '12-06-2017',
      user: { username: 'toodoo' } }],
    currentPage: 1,
    pages: 4,
    params: {
      page: '3'
    },
    viewAllDocuments: sinon.spy(),
    changeCurrentDocument: sinon.spy(),
    user: { id: 3 },
  };
  beforeEach(() => {
    component = mount(<AllDocuments {...props}/>, {
      context: { store },
      childContextTypes: {
        store: React.PropTypes.object
      }
    });
  });
  afterEach(() => {
    props.viewAllDocuments.reset();
    props.changeCurrentDocument.reset();
  });

  it('should have all the set props', () => {
    expect(component.props().pages).to.equal(4);
    expect(component.props().currentPage).to.equal(1);
  });
  it('should have the required states', () => {
    expect(component.state().limit).to.equal(6);
    expect(component.state().offset).to.equal(0);
  });
  it('should mount with necessary props', () => {
    const componentDidMountSpy =
      sinon.spy(AllDocuments.prototype, 'componentDidMount');
    mount(<AllDocuments {...props}/>, {
      context: { store },
      childContextTypes: {
        store: React.PropTypes.object
      }
    });
    expect(componentDidMountSpy.callCount).to.equal(1);
  });
  it('should find the neccessary dom elements ', () => {
    expect(component.find(CreateDocument).length).to.equal(1);
    expect(component.find('.dashboard-container').length).to.equal(1);
    expect(component.find(DocumentCard).length).to
      .equal(props.documents.length);
  });
  it('should call editDocument props on call', () => {
    component.find('#create-doc-btn').last().simulate('click');
    expect(props.changeCurrentDocument.callCount).to.equal(1);
  });
});
