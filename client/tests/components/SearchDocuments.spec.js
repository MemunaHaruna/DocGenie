import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { SearchDocuments } from
  '../../app/components/documents/SearchDocuments.jsx';

describe('Search Component', () => {
  let component;
  const props = {
    searchForDocuments: sinon.spy(),
  };
  beforeEach(() => {
    component = mount(<SearchDocuments {...props}/>);
  });
  afterEach(() => {
    props.searchForDocuments.reset();
  });

  it('should find the neccessary dom elements ', () => {
    expect(component.find('.search-docs').length).to.equal(1);
    expect(component.find('input').length).to.equal(1);
  });
  it('simulates click events', () => {
    component.find('input').simulate('change', { target: {
      value: 'the' } });
    expect(props.searchForDocuments).to.have.property('callCount', 1);
  });
});
