import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import sinon from 'sinon';
import { VIEW_DOCUMENTS, VIEW_DOCUMENTS_ERROR, CREATE_DOCUMENT,
  CHANGE_CURRENT_DOCUMENT, EDIT_DOCUMENT } from '../../app/actionTypes';

import { viewAllDocuments, changeCurrentDocument,
  createDocument, searchForDocuments, editDocument }
  from '../../app/actions/documentActions';

const mockStore = configureMockStore([thunk]);


describe('Document Actions', () => {
  let store;
  let axiosGetStub;
  let axiosPostStub;
  let axiosPutStub;
  let axiosDeleteStub;
  const response = { data: {
    documents: ['I am one document'],
    pagination: 'pagination object'
  } };
  const error = {
    response: {
      data: 'an error'
    }
  };
  beforeEach(() => {
    store = mockStore({ documents: [] });
    axiosGetStub = sinon.stub(axios, 'get', (url) => {
      return url.indexOf('api') > -1 ?
        Promise.resolve(response) : Promise.reject(error);
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
  });
  it('should dispatch an action when viewAllDocuments action is triggered',
    () => {
      return store.dispatch(viewAllDocuments('api/?limit=3')).then(() => {
        expect(store.getActions()).to.deep.equal([{
          type: VIEW_DOCUMENTS,
          documents: response.data.documents,
          pagination: response.data.pagination
        }]);
      });
    });
  it('should fail and dispatch error on failed viewAllDocuments request',
    () => {
      return store.dispatch(viewAllDocuments('error-url')).catch(() => {
        const errorMessage = error.response.data;
        expect(store.getActions()).to.deep.equal([{
          type: VIEW_DOCUMENTS_ERROR,
          errorMessage }]);
      });
    });
  it('should dispatch appropriate actions on createDocument', () => {
    const document = { id: 23,
      userId: 45,
      title: 'A good life',
      content: 'A good life by Marion Bennet' };
    return store.dispatch(createDocument(document, 'api')).then(() => {
      expect(store.getActions().map(action => action.type))
        .to.deep.equal([CREATE_DOCUMENT, VIEW_DOCUMENTS]);
    });
  });
  it('should dispatch appropriate actions on changeCurrentDocument', () => {
    const document = { id: 23,
      userId: 45,
      title: 'A good life',
      content: 'A good life by Marion Bennet' };
    expect(changeCurrentDocument(document)).to.deep.equal({
      type: CHANGE_CURRENT_DOCUMENT,
      document
    });
  });
  it('should dispatch appropriate actions on editDocument', () => {
    const document = { id: 23,
      userId: 45,
      title: 'A good life',
      content: 'A good life by Marion Bennet' };
    return store.dispatch(editDocument(document, 'api')).then(() => {
      expect(store.getActions().map(action => action.type))
        .to.deep.equal([EDIT_DOCUMENT, VIEW_DOCUMENTS]);
    });
  });
  it('should dispatch appropriate actions on deleteDocument', () => {
    return store.dispatch(viewAllDocuments('api')).then(() => {
      expect(store.getActions())
        .to.deep.equal([{
          type: VIEW_DOCUMENTS,
          documents: response.data.documents,
          pagination: response.data.pagination
        }]);
    });
  });
  it('should dispatch appropriate actions on searchForDocuments', () => {
    return store
      .dispatch(searchForDocuments('api'))
      .then(() => {
        expect(store.getActions()).to.deep.equal([{
          type: VIEW_DOCUMENTS,
          documents: response.data.documents,
          pagination: response.data.pagination
        }]);
      });
  });
});
