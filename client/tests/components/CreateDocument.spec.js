// import React from 'react';
// import { expect } from 'chai';
// import sinon from 'sinon';
// import { shallow, mount } from 'enzyme';
// import configureStore from 'redux-mock-store';
// import { Modal } from 'react-materialize';
// import thunk from 'redux-thunk';
// import { CreateDocument } from
//   '../../app/components/documents/CreateDocument.jsx';

// describe('CreateDocument component', () => {
//   let component;
//   const props = {
//     currentDocument: { id: 2,
//       title: 'A document',
//       content: 'lorem ipsum',
//       userId: 3,
//       createdAt: '12-06-2017',
//       user: { username: 'toodoo' } },
//     createDocument: sinon.spy(),
//     editDocument: sinon.spy(),
//     user: { id: 3 },
//   };
//   beforeEach(() => {
//     component = mount(<CreateDocument {...props} hhh="eioafeao"/>);
//   });
//   afterEach(() => {
//     props.createDocument.reset();
//     props.editDocument.reset();
//   });

//   it('should have all the set props', () => {
//     expect(component.props().currentDocument.id).to.equal(2);
//     expect(component.props().user.id).to.equal(3);
//   });
//   it('should have the required states', () => {
//     expect(component.state()).to.eql(component.props().currentDocument);
//   });
//   it('should find the neccessary dom elements ', () => {
//     expect(component.find(Modal).length).to.equal(1);
//   });
// });
