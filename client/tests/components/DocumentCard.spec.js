import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { DocumentCard } from '../../app/components/documents/DocumentCard.jsx';

describe('DocumentCard component', () => {
  let component;
  const props = {
    currentDocument: {},
    documents: [{ id: 1,
      title: '1st document',
      content: 'lorem ipsum',
      userId: 3,
      createdAt: '12-06-2017',
      user: { username: 'toodoo' } },
    { id: 2,
      title: '2nd document',
      content: 'lorem ipsum',
      userId: 3,
      createdAt: '12-06-2017',
      user: { username: 'toodoo' } }],
    document: { id: 3,
      title: 'A document',
      content: 'lorem ipsum jbachvzbjhvcbxxc',
      userId: 22,
      createdAt: '12-06-2017',
      user: { username: 'toodleedoo' } },
    currentUser: { id: 22 },
    deleteDocument: sinon.spy(),
    changeCurrentDocument: sinon.spy(),
  };
  beforeEach(() => {
    component = mount(<DocumentCard {...props}/>);
  });
  afterEach(() => {
    props.deleteDocument.reset();
    props.changeCurrentDocument.reset();
  });
  it('should have all the set props', () => {
    expect(component.props().documents[0].content).to.equal('lorem ipsum');
    expect(component.props().currentUser.id).to.equal(22);
  });
  it('should have the neccessary dom elements ', () => {
    expect(component.find('.darken-1').length).to.equal(1);
    expect(component.find('a').length).to.equal(3);
  });
  it('should allow a user trigger editDocument action on button click', () => {
    component.find('#edit').simulate('click');
    expect(props.changeCurrentDocument.callCount).to.equal(1);
  });
});
