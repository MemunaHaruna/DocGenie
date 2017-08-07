import { VIEW_DOCUMENTS, VIEW_DOCUMENTS_ERROR, CREATE_DOCUMENT,
  CREATE_DOCUMENT_ERROR, CHANGE_CURRENT_DOCUMENT, EDIT_DOCUMENT,
  VIEW_ONE_DOCUMENT, EDIT_DOCUMENT_ERROR,
  DELETE_DOCUMENT_ERROR, VIEW_ONE_DOCUMENT_ERROR } from '../actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
  case VIEW_DOCUMENTS: {
    const newDocuments = action.documents;
    return {
      ...state,
      documents: newDocuments,
      ...action.pagination,
      error: '' };
  }
  case VIEW_ONE_DOCUMENT: {
    return { ...state, document: action.document, error: '' };
  }
  case CHANGE_CURRENT_DOCUMENT: {
    return { ...state, currentDocument: action.document, error: '' };
  }
  case CREATE_DOCUMENT:
  case EDIT_DOCUMENT: {
    const { documents = [] } = state;
    const newDocuments = [action.document, ...documents];
    return { ...state, documents: newDocuments, error: '' };
  }

  case EDIT_DOCUMENT_ERROR:
  case DELETE_DOCUMENT_ERROR:
  case VIEW_DOCUMENTS_ERROR:
  case CREATE_DOCUMENT_ERROR:
  case VIEW_ONE_DOCUMENT_ERROR: {
    return { ...state, error: action.errorMessage };
  }
  default:
    return state;
  }
};
