import axios from 'axios';
import toastr from 'toastr';
import { VIEW_DOCUMENTS, VIEW_DOCUMENTS_ERROR, CREATE_DOCUMENT,
  CREATE_DOCUMENT_ERROR, CHANGE_CURRENT_DOCUMENT, EDIT_DOCUMENT,
  EDIT_DOCUMENT_ERROR, DELETE_DOCUMENT_ERROR, VIEW_ONE_DOCUMENT,
  VIEW_ONE_DOCUMENT_ERROR } from '../actionTypes';

let errorMessage;

/**
* @description - Allows the user view all documents available
* @param {object} url - api endpoints to fetch docuents from
* @returns {function} dispatch - redux dispatch function
*/
export const viewAllDocuments = (url) => {
  return (dispatch) => {
    return axios.get(url)
      .then((response) => {
        dispatch({ type: VIEW_DOCUMENTS,
          documents: response.data.documents,
          pagination: response.data.pagination });
      }).catch((error) => {
        errorMessage = error.response.data.message || error.response.data || '';
        dispatch({ type: VIEW_DOCUMENTS_ERROR,
          errorMessage });
        return Promise.reject(errorMessage);
      });
  };
};

/**
* @description - Allows the user create a new document
* @param {object} document - title, access, content, userId
* @param {string} url - api endpoint to fetch all documents again after
* creating a new document
* @returns {function} dispatch - redux dispatch function
*/
export const createDocument = (document, url) => {
  return (dispatch) => {
    return axios.post('/api/documents', document)
      .then((response) => {
        toastr.success('Document created!');
        dispatch({ type: CREATE_DOCUMENT,
          document: { ...document, ...response.data } });
        dispatch(viewAllDocuments(url));
        $('#create-form').modal('close');
      }).catch((error) => {
        errorMessage = error.response.data.message || error.response.data;

        dispatch({ type: CREATE_DOCUMENT_ERROR,
          errorMessage });
        return Promise.reject(toastr.error(errorMessage));
      });
  };
};

/**
* @description - Toggles between edit and delete actions
* @param {object} document - document to be deleted or updated
* @returns {object} action - redux action object
*/
export const changeCurrentDocument = (document) => {
  return {
    type: CHANGE_CURRENT_DOCUMENT,
    document
  };
};

/**
* @description - updates selected document
* @param {object} document - title, access, content
* @param {string} url - endpoint to fetch all documents after editing
* @returns {function} dispatch - redux dispatch function
*/
export const editDocument = (document, url) => {
  return (dispatch) => {
    return axios.put(`/api/documents/${document.id}`,
      document)
      .then((response) => {
        dispatch({ type: EDIT_DOCUMENT,
          document: { ...document, ...response.data } });
        $('#create-form').modal('close');
        toastr.success('Document edited!');
        dispatch(viewAllDocuments(url));
      }).catch((error) => {
        errorMessage = error.response.data.message || error.response.data;
        dispatch({ type: EDIT_DOCUMENT_ERROR,
          errorMessage });
        return Promise.reject(toastr.error(errorMessage));
      });
  };
};

/**
* @description - deletes a document
* @param {object} document - contains document id
* @param {object} paginationMetadata - limit, offset
* @returns {function} dispatch - redux dispatch function
*/
export const deleteDocument = (document, paginationMetadata) => {
  return (dispatch) => {
    return axios.delete(`/api/documents/${document.id}`)
      .then(() => {
        dispatch(viewAllDocuments(paginationMetadata));
      }).catch((error) => {
        dispatch({ type: DELETE_DOCUMENT_ERROR,
          errorMessage: error.response.data.message || error.response.data });
      });
  };
};

/**
* @description - searches for documents
* @param {url} url - endpoint to fetch searched documents
* @returns {function} dispatch - redux dispatch function
*/
export const searchForDocuments = (url) => {
  return dispatch => dispatch(viewAllDocuments(url));
};

/**
* @description - finds a particular document
* @param {number} id - document id
* @returns {function} dispatch - redux dispatch function
*/
export const findADocument = (id) => {
  return (dispatch) => {
    return axios.get(`/api/documents/${id}`)
      .then((response) => {
        dispatch({ type: VIEW_ONE_DOCUMENT, document: { ...response.data } });
      }).catch((error) => {
        dispatch({ type: VIEW_ONE_DOCUMENT_ERROR,
          errorMessage: error.response.data.message || error.response.data });
      });
  };
};
